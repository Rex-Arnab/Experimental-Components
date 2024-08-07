"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const KanbanBoard = () => {
  const [stages, setStages] = useState([
    { id: "todo", name: "To Do", tasks: [] }
  ]);
  const [newStageName, setNewStageName] = useState("");
  const [newTask, setNewTask] = useState("");

  const addStage = () => {
    if (newStageName) {
      setStages([
        ...stages,
        { id: Date.now().toString(), name: newStageName, tasks: [] }
      ]);
      setNewStageName("");
    }
  };

  const addTask = (stageId) => {
    if (newTask) {
      const updatedStages = stages.map((stage) => {
        if (stage.id === stageId) {
          return { ...stage, tasks: [...stage.tasks, newTask] };
        }
        return stage;
      });
      setStages(updatedStages);
      setNewTask("");
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceStage = stages.find((stage) => stage.id === source.droppableId);
    const destinationStage = stages.find(
      (stage) => stage.id === destination.droppableId
    );

    const [movedTask] = sourceStage.tasks.splice(source.index, 1);
    destinationStage.tasks.splice(destination.index, 0, movedTask);

    setStages([...stages]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newStageName}
            onChange={(e) => setNewStageName(e.target.value)}
            placeholder="New Stage Name"
            className="border p-2 mr-2"
          />
          <button onClick={addStage} className="bg-blue-500 text-white p-2">
            Add Stage
          </button>
        </div>
        <div className="flex space-x-4 overflow-x-auto">
          {stages.map((stage) => (
            <Droppable key={stage.id} droppableId={stage.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded-lg p-4 w-64">
                  <h2 className="font-semibold">
                    {stage.name} ({stage.tasks.length})
                  </h2>
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New Task"
                    className="border p-1 w-full"
                  />
                  <button
                    onClick={() => addTask(stage.id)}
                    className="bg-green-500 text-white p-1 mt-1 w-full">
                    Add Task
                  </button>
                  <ul>
                    {stage.tasks.map((task, index) => (
                      <Draggable key={task} draggableId={task} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex justify-between items-center bg-white p-2 mb-1 rounded shadow">
                            {task}
                          </li>
                        )}
                      </Draggable>
                    ))}
                  </ul>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
