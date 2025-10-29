<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::query();

        // Filtro de busqueda
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filtro de estado (is_active)
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('is_active', $request->status);
        }

        // Ordenar y paginar
        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
        $services = $query->latest()->paginate($perPage, ['*'], 'page', $page);

        return Inertia::render('services/Index', [
            'services' => $services->items(),
            'pagination' => [
                'total' => $services->total(),
                'per_page' => $services->perPage(),
                'current_page' => $services->currentPage(),
                'last_page' => $services->lastPage(),
                'from' => $services->firstItem(),
                'to' => $services->lastItem()
            ],
            'filters' => [
                'search' => $request->search ?? '',
                'perPage' => $perPage,
                'status' => $request->status ?? 'all',
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'is_active' => 'required|boolean',
            'icon' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'features' => 'required|array|min:1',
            'features.*' => 'string',
        ]);

        $service = Service::create($validatedData);

        return response()->json([
            'message' => 'Service created successfully',
            'data' => $service
        ], 201);
    }
}
