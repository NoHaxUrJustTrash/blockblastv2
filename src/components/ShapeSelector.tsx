import React from 'react';

interface ShapeSelectorProps {
  shapes: Array<{
    id: string;
    blocks: number[][];
    color: string;
  }>;
  selectedIndex: number | null;
  onSelectShape: (index: number) => void;
}

export const ShapeSelector: React.FC<ShapeSelectorProps> = ({ shapes, selectedIndex, onSelectShape }) => {
  const getBlockColor = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-500';
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-400';
      case 'purple': return 'bg-purple-500';
      case 'orange': return 'bg-orange-500';
      case 'cyan': return 'bg-cyan-400';
      default: return 'bg-gray-500';
    }
  };

  const renderShape = (shape, index) => {
    // Find the dimensions of the shape
    let minRow = 0, minCol = 0, maxRow = 0, maxCol = 0;
    
    shape.blocks.forEach(([r, c]) => {
      minRow = Math.min(minRow, r);
      minCol = Math.min(minCol, c);
      maxRow = Math.max(maxRow, r);
      maxCol = Math.max(maxCol, c);
    });
    
    const height = maxRow - minRow + 1;
    const width = maxCol - minCol + 1;
    
    // Create a grid for the shape
    const grid = Array(height).fill(null).map(() => Array(width).fill(false));
    
    // Fill in the grid
    shape.blocks.forEach(([r, c]) => {
      const adjustedRow = r - minRow;
      const adjustedCol = c - minCol;
      grid[adjustedRow][adjustedCol] = true;
    });
    
    return (
      <div 
        key={shape.id}
        className={`p-2 ${selectedIndex === index ? 'bg-gray-700 rounded-lg' : ''}`}
        onClick={() => onSelectShape(index)}
      >
        <div 
          className="grid gap-0.5"
          style={{ 
            gridTemplateColumns: `repeat(${width}, 1fr)`,
            gridTemplateRows: `repeat(${height}, 1fr)`,
          }}
        >
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`aspect-square ${cell ? getBlockColor(shape.color) : 'bg-transparent'} rounded-sm relative`}
                style={{ width: '20px', height: '20px' }}
              >
                {cell && (
                  <>
                    <div className="absolute inset-0 bg-black opacity-20 rounded-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 15%, 15% 15%, 15% 85%, 0 100%)' }}></div>
                    <div className="absolute inset-0 bg-white opacity-30 rounded-sm" style={{ clipPath: 'polygon(100% 100%, 100% 0, 85% 15%, 85% 85%, 15% 85%, 0 100%)' }}></div>
                  </>
                )}
              </div>
            ))
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md flex justify-around items-center mt-8 mb-4">
      {shapes.map((shape, index) => renderShape(shape, index))}
    </div>
  );
};