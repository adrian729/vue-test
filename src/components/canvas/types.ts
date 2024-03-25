import type { XOR } from '@/types/types';

export type CanvasCirclesType = 'circles';
export type CanvasRectanglesType = 'rectangles';
export type CanvasType = XOR<CanvasCirclesType, CanvasRectanglesType>;

export interface CirclesLineType {
    idx: number;
    scale: {
        x: number;
        y: number;
    };
    rect_h: number;
}

export interface CirclesArcType {
    idx: number;
    start_angle: number;
    end_angle: number;
    radius: number;
    line_width: number;
}

export interface CirclesData {
    num_slices: number;
    lines: CirclesLineType[];
    arcs: CirclesArcType[];
}

export const isCirclesData = (data: CanvasData): data is CirclesData =>
    typeof data.num_slices === 'number' &&
    Array.isArray(data.lines) &&
    Array.isArray(data.arcs);

export interface RectangleDataPoint {
    x: number;
    y: number;
    is_in?: boolean;
}

export interface RectanglesData {
    rectangles: RectangleDataPoint[];
    gap: number;
    in_gap: number;
    divisions: number;
}

export const isRectanglesData = (data: CanvasData): data is RectanglesData =>
    Array.isArray(data.rectangles) &&
    typeof data.gap === 'number' &&
    typeof data.in_gap === 'number' &&
    typeof data.divisions === 'number';

export type CanvasData = XOR<CirclesData, RectanglesData>;

export interface CirclesCanvasItem {
    id: number | string;
    data: CirclesData;
    type: CanvasCirclesType;
}

export const isCirclesCanvasItem = (
    item: CanvasItem,
): item is CirclesCanvasItem =>
    item.type === 'circles' && isCirclesData(item.data);

export interface RectanglesCanvasItem {
    id: number | string;
    data: RectanglesData;
    type: CanvasRectanglesType;
}

export const isRectanglesCanvasItem = (
    item: CanvasItem,
): item is RectanglesCanvasItem =>
    item.type === 'rectangles' && isRectanglesData(item.data);

export type CanvasItem = XOR<CirclesCanvasItem, RectanglesCanvasItem>;
