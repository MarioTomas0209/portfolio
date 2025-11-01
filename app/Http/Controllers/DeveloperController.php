<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DeveloperController extends Controller
{
    public function index(Request $request)
    {
        $query = Developer::query();

        // Filtro de búsqueda
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('job', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('whatsapp', 'like', "%{$search}%");
            });
        }

        // Filtro de estado (is_active)
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('is_active', $request->status);
        }

        // Ordenar y paginar
        $perPage = $request->input('perPage', 10);
        // $page = $request->input('page', 1);
        $developers = $query->latest()
            ->paginate($perPage)
            ->onEachSide(1)
            ->withQueryString();

        return Inertia::render('developers/Index', [
            'developers' => $developers->items(), // Solo los items
            'pagination' => [
                'total' => $developers->total(),
                'per_page' => $developers->perPage(),
                'current_page' => $developers->currentPage(),
                'last_page' => $developers->lastPage(),
                'from' => $developers->firstItem(),
                'to' => $developers->lastItem(),
            ],
            'filters' => [
                'search' => $request->search ?? '',
                'perPage' => $perPage,
                'status' => $request->status ?? 'all',
            ],
        ]);
    }

    public function store(Request $request)
    {
        // Validar datos
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'job' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'portfolio' => 'nullable|url|max:255',
            'github' => 'nullable|url|max:255',
            'linkedin' => 'nullable|url|max:255',
            'whatsapp' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'facebook' => 'nullable|url|max:255',
            'instagram' => 'nullable|url|max:255',
            'image' => 'nullable|string|max:1024',
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'is_active' => 'required',
        ]);

        // Normalize boolean (handles 'on', 'true', '1', etc.)
        $validatedData['is_active'] = $request->boolean('is_active');

        try {
            $developer = DB::transaction(function () use ($request, $validatedData) {
                // Handle uploaded image
                if ($request->hasFile('image')) {
                    $path = $request->file('image')->store('developers/images', 'public');
                    $validatedData['image'] = $path;
                }

                // Handle uploaded CV
                if ($request->hasFile('cv')) {
                    $cvPath = $request->file('cv')->store('developers/cvs', 'public');
                    $validatedData['cv'] = $cvPath;
                }

            // Create developer
            return Developer::create($validatedData);
        });

        return response()->json([
                'message' => 'Developer created successfully',
                'developer' => $developer,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating developer: ' . $e->getMessage(), [
                'exception' => $e,
            ]);

            return response()->json([
                'message' => 'Unexpected error creating developer',
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        // Buscar el developer
        $developer = Developer::findOrFail($id);

        // Validar datos
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'job' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'portfolio' => 'nullable|url|max:255',
            'github' => 'nullable|url|max:255',
            'linkedin' => 'nullable|url|max:255',
            'whatsapp' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'facebook' => 'nullable|url|max:255',
            'instagram' => 'nullable|url|max:255',
            'image' => 'nullable|string|max:1024',
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'is_active' => 'required',
        ]);

        // Normalize boolean
        $validatedData['is_active'] = $request->boolean('is_active');

        try {
            DB::transaction(function () use ($request, $validatedData, $developer) {
                // Manejar eliminación de CV si se solicitó
                if ($request->input('remove_cv') === '1') {
                    // Eliminar CV del storage
                    $cvPath = $developer->getAttributes()['cv'] ?? null;
                    if ($cvPath && Storage::disk('public')->exists($cvPath)) {
                        Storage::disk('public')->delete($cvPath);
                    }
                    $validatedData['cv'] = null;
                }

                // Handle uploaded CV - reemplazar si hay un nuevo archivo
                if ($request->hasFile('cv')) {
                    // Eliminar CV anterior si existe
                    $cvPath = $developer->getAttributes()['cv'] ?? null;
                    if ($cvPath && Storage::disk('public')->exists($cvPath)) {
                        Storage::disk('public')->delete($cvPath);
                    }

                    $cvPath = $request->file('cv')->store('developers/cvs', 'public');
                    $validatedData['cv'] = $cvPath;
                }

                // Update developer
                $developer->update($validatedData);
            });

            // Recargar el developer con los datos actualizados
            $developer->refresh();

            return response()->json([
                'message' => 'Developer updated successfully',
                'developer' => $developer,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error updating developer: ' . $e->getMessage(), [
                'exception' => $e,
                'developer_id' => $id,
            ]);

            return response()->json([
                'message' => 'Unexpected error updating developer',
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $developer = Developer::findOrFail($id);

            DB::transaction(function () use ($developer) {
                // Eliminar archivos asociados
                $cvPath = $developer->getAttributes()['cv'] ?? null;
                if ($cvPath && Storage::disk('public')->exists($cvPath)) {
                    Storage::disk('public')->delete($cvPath);
                }

                // Eliminar developer
                $developer->delete();
            });

            return response()->json([
                'message' => 'Developer deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting developer: ' . $e->getMessage(), [
                'exception' => $e,
                'developer_id' => $id,
            ]);

            return response()->json([
                'message' => 'Unexpected error deleting developer',
            ], 500);
        }
    }
}
