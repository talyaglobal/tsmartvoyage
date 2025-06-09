import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { ResponseService, ErrorHandler } from '@/lib/response';
import { validateRequest, updateYachtSchema, uuidSchema } from '@/lib/validation';
import { withAuth, withLogging, compose } from '@/middleware';
import { UserRole, RequestContext } from '@/types';

const db = DatabaseService.getInstance();

// GET /api/yachts/[id] - Get yacht by ID
async function getYachtHandler(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const yachtId = validateRequest(uuidSchema, params.id);
    
    const yacht = await db.findById('yachts', yachtId);
    
    if (!yacht) {
      return NextResponse.json(
        ResponseService.notFound('Yacht'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      ResponseService.success(yacht),
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, response } = ErrorHandler.handle(error);
    return NextResponse.json(response, { status: statusCode });
  }
}

// PUT /api/yachts/[id] - Update yacht (Admin/Manager only)
async function updateYachtHandler(
  req: NextRequest, 
  context: RequestContext,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const yachtId = validateRequest(uuidSchema, params.id);
    const body = await req.json();
    const updateData = validateRequest(updateYachtSchema, body);

    // Check if yacht exists
    const existingYacht = await db.findById('yachts', yachtId);
    if (!existingYacht) {
      return NextResponse.json(
        ResponseService.notFound('Yacht'),
        { status: 404 }
      );
    }

    // Update yacht
    const updatedData = {
      ...updateData,
      updated_at: new Date().toISOString()
    };

    const updatedYacht = await db.update('yachts', yachtId, updatedData);

    return NextResponse.json(
      ResponseService.updated(updatedYacht[0], 'Yacht updated successfully'),
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, response } = ErrorHandler.handle(error);
    return NextResponse.json(response, { status: statusCode });
  }
}

// DELETE /api/yachts/[id] - Delete yacht (Admin only)
async function deleteYachtHandler(
  req: NextRequest,
  context: RequestContext,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const yachtId = validateRequest(uuidSchema, params.id);

    // Check if yacht exists
    const existingYacht = await db.findById('yachts', yachtId);
    if (!existingYacht) {
      return NextResponse.json(
        ResponseService.notFound('Yacht'),
        { status: 404 }
      );
    }

    // Check if yacht has active charters
    const activeCharters = await db.query('charters', {
      filters: { 
        yacht_id: yachtId, 
        status: 'CONFIRMED'
      },
      pagination: { page: 1, limit: 1 }
    });

    if (activeCharters.length > 0) {
      return NextResponse.json(
        ResponseService.badRequest('Cannot delete yacht with active charters'),
        { status: 400 }
      );
    }

    await db.delete('yachts', yachtId);

    return NextResponse.json(
      ResponseService.deleted('Yacht deleted successfully'),
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, response } = ErrorHandler.handle(error);
    return NextResponse.json(response, { status: statusCode });
  }
}

export const GET = compose(
  withLogging()
)(getYachtHandler);

export const PUT = compose(
  withLogging(),
  withAuth(UserRole.MANAGER)
)((req: NextRequest, { params }: { params: { id: string } }) => 
  withAuth(UserRole.MANAGER)((req: NextRequest, context: RequestContext) => 
    updateYachtHandler(req, context, { params })
  )(req)
);

export const DELETE = compose(
  withLogging(),
  withAuth(UserRole.ADMIN)
)((req: NextRequest, { params }: { params: { id: string } }) => 
  withAuth(UserRole.ADMIN)((req: NextRequest, context: RequestContext) => 
    deleteYachtHandler(req, context, { params })
  )(req)
);

