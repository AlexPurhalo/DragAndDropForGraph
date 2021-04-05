import React, { Fragment, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { appendIdex, replaceItem } from './utils'

const records = [
  { id: "record-1", title: "page 1" },
  { id: "record-2", title: "page 2" },
  [
    { id: "record-3", title: "page 3" },
    { id: "record-4", title: "page 4" },
  ],
  { id: "record-5", title: "page 5" },
  [
    { id: "record-6", title: "page 6" },
    [
      { id: "record-7", title: "page 7" },
      { id: "record-8", title: "page 8" },
    ],
  ],
  { id: "record-9", title: "page 9" },
];

function NestedItemsList({ items, forwardedRef, ...configs }) {
  return (
    <ul {...configs} {...(forwardedRef ? { ref: forwardedRef } : {})}>
      {items.map(function renderElements(element) {
        if (!Array.isArray(element))
          return (
            <Draggable
              key={element.id}
              draggableId={element.id}
              index={element.idx}
            >
              {(provided, snapshot) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {element.title}
                </li>
              )}
            </Draggable>
          );

        return <NestedItemsList items={element} />;
      })}
    </ul>
  );
}

export default function App() {
  const [state, setState] = useState({ pages: appendIdex(records) })

  function handleDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    // console.log(result.source.index)
    // console.log(result.destination.index)
    const pages = replaceItem(state.pages, [
      result.source.index,
      result.destination.index,
    ]);

    setState({ pages });
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Fragment>
            <NestedItemsList
              forwardedRef={provided.innerRef}
              items={state.pages}
              {...provided.droppableProps}
            />
            {provided.placeholder}
          </Fragment>
        )}
      </Droppable>
    </DragDropContext>
  );
}
