import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
    // In a real app, verify Admin Session/Token here!
    // For this prototype, we assume access to this route is protected or obscure.

    try {
        const { data, error } = await supabaseAdmin
            .from('participants')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
