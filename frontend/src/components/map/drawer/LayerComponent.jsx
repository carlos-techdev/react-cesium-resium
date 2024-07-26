// LayerComponent.jsx
import React from 'react';
import { Layer, Rect, Circle, Line } from 'react-konva';

const LayerComponent = ({ shapes, onShapesChange, selectedId, setSelectedId, opacity, visible }) => {
  const handleShapeClick = (e, id) => {
    setSelectedId(id);
  };

  const handleDragEnd = (e, id) => {
    const newShapes = shapes.map((shape) => {
      if (shape.id === id) {
        return {
          ...shape,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return shape;
    });
    onShapesChange(newShapes);
  };

  return (
    visible && (
      <Layer opacity={opacity}>
        {shapes.map((shape) => {
          if (shape.type === 'rect') {
            return (
              <Rect
                key={shape.id}
                {...shape}
                draggable
                onClick={(e) => handleShapeClick(e, shape.id)}
                onDragEnd={(e) => handleDragEnd(e, shape.id)}
                stroke={shape.id === selectedId ? 'blue' : 'black'}
              />
            );
          } else if (shape.type === 'circle') {
            return (
              <Circle
                key={shape.id}
                {...shape}
                draggable
                onClick={(e) => handleShapeClick(e, shape.id)}
                onDragEnd={(e) => handleDragEnd(e, shape.id)}
                stroke={shape.id === selectedId ? 'blue' : 'black'}
              />
            );
          } else if (shape.type === 'line') {
            return (
              <Line
                key={shape.id}
                {...shape}
                draggable
                onClick={(e) => handleShapeClick(e, shape.id)}
                onDragEnd={(e) => handleDragEnd(e, shape.id)}
                stroke={shape.id === selectedId ? 'blue' : 'black'}
              />
            );
          }
          return null;
        })}
      </Layer>
    )
  );
};

export default LayerComponent;
