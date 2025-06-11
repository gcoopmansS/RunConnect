import React, { useState } from "react";
import { Workout, Exercise } from "../../types";
import Modal from "../common/Modal";

interface WorkoutModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (workout: Partial<Workout> & { exercises: Exercise[] }) => void;
  initialWorkout?: Partial<Workout>;
}

const defaultWorkout: Partial<Workout> = {
  title: "",
  description: "",
  type: "easy_run",
  duration: 0,
  distance: 0,
  intensity: "medium",
  sport: "running",
  exercises: [],
};

// Default blocks: 2 km warmup, 5x (400m run, 400m rest), 2 km cooldown
const defaultBlocks: Exercise[] = [
  {
    id: Date.now().toString() + "-warmup",
    type: "warmup",
    name: "Warmup",
    description: "",
    distance: 2,
    distanceUnit: "km",
    duration: undefined,
    durationStr: "00:00:00",
    repetitions: undefined,
    restTime: undefined,
    intensity: "",
  },
  {
    id: Date.now().toString() + "-interval",
    type: "repeat",
    name: "Interval",
    description: "",
    repeatCount: 5,
    children: [
      {
        id: Date.now().toString() + "-run",
        type: "run",
        name: "Run",
        description: "",
        distance: 0.4,
        distanceUnit: "km",
        duration: undefined,
        durationStr: "00:00:00",
        repetitions: undefined,
        restTime: undefined,
        intensity: "",
      },
      {
        id: Date.now().toString() + "-recovery",
        type: "recovery",
        name: "Rest",
        description: "",
        distance: 0.4,
        distanceUnit: "km",
        duration: undefined,
        durationStr: "00:00:00",
        repetitions: undefined,
        restTime: undefined,
        intensity: "",
      },
    ],
  },
  {
    id: Date.now().toString() + "-cooldown",
    type: "cooldown",
    name: "Cooldown",
    description: "",
    distance: 2,
    distanceUnit: "km",
    duration: undefined,
    durationStr: "00:00:00",
    repetitions: undefined,
    restTime: undefined,
    intensity: "",
  },
];

// Helper to create a new single block
const createSingleBlock = (type: Exercise["type"] = "run"): Exercise => ({
  id: Date.now().toString(),
  type: type === "repeat" ? "run" : type, // fallback to 'run' if 'repeat' is passed
  name: "",
  description: "",
  duration: undefined,
  durationStr: "00:00:00",
  distance: undefined,
  distanceUnit: "km",
  repetitions: undefined,
  restTime: undefined,
  intensity: "",
});

// Helper to create a new repeat block
const createRepeatBlock = (): Exercise => ({
  id: Date.now().toString(),
  type: "repeat",
  name: "Repeat Interval",
  description: "",
  repeatCount: 2,
  children: [createSingleBlock("run"), createSingleBlock("recovery")],
});

const WorkoutModal: React.FC<WorkoutModalProps> = ({
  open,
  onClose,
  onSave,
  initialWorkout,
}) => {
  const [newWorkout, setNewWorkout] = useState<Partial<Workout>>(
    initialWorkout || defaultWorkout
  );
  const [blocks, setBlocks] = useState<Exercise[]>(
    initialWorkout &&
      initialWorkout.exercises &&
      initialWorkout.exercises.length > 0
      ? initialWorkout.exercises
      : defaultBlocks
  );

  // Add, remove, update exercise helpers
  const addRepeatBlock = () => setBlocks([...blocks, createRepeatBlock()]);
  const addExerciseBlock = () => setBlocks([...blocks, createSingleBlock()]);

  const removeBlock = (id: string, parentId?: string) => {
    if (parentId) {
      setBlocks(
        blocks.map((b) =>
          b.type === "repeat" && b.id === parentId
            ? { ...b, children: b.children.filter((c) => c.id !== id) }
            : b
        ) as Exercise[]
      );
    } else {
      setBlocks(blocks.filter((b) => b.id !== id));
    }
  };

  const updateBlock = (id: string, update: Partial<Exercise>) => {
    setBlocks(
      blocks.map((b) => {
        if (b.id !== id) return b;
        if (b.type === "repeat" && update.type && update.type !== "repeat") {
          // Convert repeat to single block
          return createSingleBlock(update.type);
        } else if (b.type !== "repeat" && update.type === "repeat") {
          // Convert single to repeat block
          return createRepeatBlock();
        } else if (b.type === "repeat") {
          return { ...b, ...update };
        } else {
          return { ...b, ...update };
        }
      }) as Exercise[]
    );
  };

  const updateRepeatChild = (
    repeatId: string,
    childId: string,
    update: Partial<Exercise>
  ) => {
    setBlocks(
      blocks.map((b) =>
        b.type === "repeat" && b.id === repeatId
          ? {
              ...b,
              children: b.children.map((c) =>
                c.id === childId && c.type !== "repeat"
                  ? { ...c, ...update }
                  : c
              ),
            }
          : b
      ) as Exercise[]
    );
  };

  const addRepeatChild = (repeatId: string) => {
    setBlocks(
      blocks.map((b) =>
        b.type === "repeat" && b.id === repeatId
          ? {
              ...b,
              children: [...b.children, createSingleBlock()],
            }
          : b
      ) as Exercise[]
    );
  };

  // Flatten blocks for timeline visualization
  const flattenBlocks = (blocks: Exercise[]): Exercise[] => {
    let result: Exercise[] = [];
    for (const block of blocks) {
      if (block.type !== "repeat") {
        result.push(block);
      } else if (block.type === "repeat") {
        for (let i = 0; i < block.repeatCount; i++) {
          result = result.concat(
            block.children.filter((c) => c.type !== "repeat")
          );
        }
      }
    }
    return result;
  };

  // Compute total distance for axis
  const getTotalDistance = (exercises: Exercise[]) => {
    return flattenBlocks(exercises).reduce(
      (sum, ex) =>
        ex.type !== "repeat"
          ? sum + (ex.distance ? Number(ex.distance) : 0)
          : sum,
      0
    );
  };

  // Get axis ticks
  const getAxisTicks = (exercises: Exercise[]) => {
    const total = getTotalDistance(exercises);
    const step = total > 5 ? 1 : 0.5;
    const ticks = [];
    for (let km = step; km <= total + 0.01; km += step) {
      ticks.push(Number(km.toFixed(1)));
    }
    return ticks;
  };

  // Color mapping for block types
  const blockTypeColors = {
    warmup: {
      bg: "bg-red-300",
      border: "border-l-4 border-red-400",
    },
    cooldown: {
      bg: "bg-green-300",
      border: "border-l-4 border-green-400",
    },
    recovery: {
      bg: "bg-gray-300",
      border: "border-l-4 border-gray-400",
    },
    run: {
      bg: "bg-blue-300",
      border: "border-l-4 border-blue-300",
    },
    repeat: {
      bg: "bg-blue-400",
      border: "border-l-4 border-blue-500",
    },
  };

  // Helper for color based on exercise type
  const getBlockColor = (type: Exercise["type"]) => {
    return blockTypeColors[type]?.bg || "bg-purple-200";
  };

  // Helper for block border color
  const getBlockBorder = (type: Exercise["type"]) => {
    return blockTypeColors[type]?.border || "border-l-4 border-purple-300";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...newWorkout, exercises: blocks });
    onClose();
    setBlocks([]);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl"
    >
      <div className="p-4 w-full">
        <h2 className="text-xl font-bold mb-4">Create New Workout</h2>
        {/* Sport selector */}
        <div className="mb-4 flex gap-4 items-center">
          <label className="font-medium">Sport:</label>
          <select
            className="border rounded px-3 py-2"
            value={newWorkout.sport || "running"}
            onChange={(e) =>
              setNewWorkout({
                ...newWorkout,
                sport: e.target.value as "running" | "strength",
              })
            }
          >
            <option value="running">Running</option>
            <option value="strength">Strength</option>
          </select>
        </div>
        <form
          className="space-y-4"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={newWorkout.title}
              onChange={(e) =>
                setNewWorkout({ ...newWorkout, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              className="w-full border rounded px-3 py-2"
              value={newWorkout.description}
              onChange={(e) =>
                setNewWorkout({ ...newWorkout, description: e.target.value })
              }
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={newWorkout.type}
                onChange={(e) =>
                  setNewWorkout({
                    ...newWorkout,
                    type: e.target.value as Workout["type"],
                  })
                }
              >
                <option value="easy_run">Easy Run</option>
                <option value="tempo">Tempo</option>
                <option value="intervals">Intervals</option>
                <option value="long_run">Long Run</option>
                <option value="recovery">Recovery</option>
                <option value="strength">Strength</option>
              </select>
            </div>
            {/* Remove duration and distance input fields, replace with summary */}
            <div className="flex-1 flex flex-col justify-end">
              <label className="block text-sm font-medium mb-1">
                Total Duration
              </label>
              <div className="border rounded px-3 py-2 bg-gray-50 text-gray-700">
                {(() => {
                  // Calculate total duration from blocks
                  const total = flattenBlocks(blocks).reduce(
                    (sum, ex) =>
                      ex.type !== "repeat" && ex.duration
                        ? sum + ex.duration
                        : sum,
                    0
                  );
                  return total > 0 ? `${total} min` : "-";
                })()}
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-end">
              <label className="block text-sm font-medium mb-1">
                Total Distance
              </label>
              <div className="border rounded px-3 py-2 bg-gray-50 text-gray-700">
                {(() => {
                  // Calculate total distance from blocks
                  const total = flattenBlocks(blocks).reduce(
                    (sum, ex) =>
                      ex.type !== "repeat" && ex.distance
                        ? sum + ex.distance
                        : sum,
                    0
                  );
                  return total > 0 ? `${total} km` : "-";
                })()}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Intensity</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={newWorkout.intensity}
              onChange={(e) =>
                setNewWorkout({
                  ...newWorkout,
                  intensity: e.target.value as Workout["intensity"],
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Exercises</label>
            {/* Timeline visualization for running workouts */}
            {newWorkout.sport === "running" && (
              <div className="mb-6">
                <div className="flex items-center gap-1 relative min-h-[40px]">
                  {/* Timeline:
                  {flattenBlocks(blocks).map((ex) =>
                    ex.type !== "repeat" ? (
                      <div
                        key={ex.id}
                        className={`rounded-md h-6 ${getBlockColor(ex.type)} flex items-center justify-center border border-gray-300 shadow-sm`}
                        style={{
                          width: ex.distance ? Math.max(60, ex.distance * 30) : 60,
                        }}
                        title={ex.name}
                      />
                    ) : null
                  )} */}
                  {flattenBlocks(blocks).map((ex) =>
                    ex.type !== "repeat" ? (
                      <div
                        key={ex.id}
                        className={`rounded-md h-6 ${getBlockColor(
                          ex.type
                        )} flex items-center justify-center border border-gray-300 shadow-sm`}
                        style={{
                          width: ex.distance
                            ? Math.max(60, ex.distance * 30)
                            : 60,
                        }}
                        title={ex.name}
                      />
                    ) : null
                  )}
                </div>
                {/* Axis below timeline */}
                <div className="flex items-center gap-1 mt-2 relative">
                  {getAxisTicks(blocks).map((tick, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center"
                      style={{ minWidth: 60 }}
                    >
                      <span className="text-xs text-gray-500">{tick} km</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Exercise editor */}
            <div className="space-y-4">
              {blocks.map((block, idx) =>
                block.type === "repeat" ? (
                  <div
                    key={block.id}
                    className="bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow mb-2 p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-lg">
                        Repeat Block
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          className="border rounded px-2 py-1 w-20"
                          value={block.repeatCount}
                          min={1}
                          onChange={(e) =>
                            updateBlock(block.id, {
                              repeatCount: Number(e.target.value),
                            })
                          }
                        />
                        <span className="text-xs text-gray-500">repeats</span>
                        <button
                          type="button"
                          className="text-red-400 hover:text-red-600"
                          onClick={() => removeBlock(block.id)}
                          title="Remove Repeat Block"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="ml-4 space-y-2">
                      {block.children.map((child, cidx) =>
                        child.type !== "repeat" ? (
                          <div
                            key={child.id}
                            className={`bg-white rounded-lg shadow border ${getBlockBorder(
                              child.type
                            )} mb-2 p-4 relative`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-lg">
                                {child.name || `Block ${cidx + 1}`}
                              </span>
                              <button
                                type="button"
                                className="text-red-400 hover:text-red-600"
                                onClick={() => removeBlock(child.id, block.id)}
                                title="Remove Block"
                              >
                                🗑️
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                              <div>
                                <label className="block font-semibold text-sm mb-1">
                                  Type
                                </label>
                                <select
                                  className="border rounded px-2 py-1 w-full mb-2"
                                  value={child.type}
                                  onChange={(e) =>
                                    updateRepeatChild(block.id, child.id, {
                                      type: e.target.value as Exercise["type"],
                                    })
                                  }
                                  required
                                >
                                  <option value="warmup">Warmup</option>
                                  <option value="cooldown">Cooldown</option>
                                  <option value="run">Run</option>
                                  <option value="recovery">Recovery</option>
                                  <option value="repeat">Repeat</option>
                                </select>
                                <label className="block font-semibold text-sm mb-1">
                                  Details
                                </label>
                                <input
                                  type="text"
                                  className="border rounded px-2 py-1 w-full"
                                  placeholder="Step name (e.g. Run, Rest, Warmup)"
                                  value={child.name}
                                  onChange={(e) =>
                                    updateRepeatChild(block.id, child.id, {
                                      name: e.target.value,
                                    })
                                  }
                                  required
                                />
                                <textarea
                                  className="border rounded px-2 py-1 w-full mt-2"
                                  placeholder="Notes or description"
                                  value={child.description}
                                  maxLength={200}
                                  onChange={(e) =>
                                    updateRepeatChild(block.id, child.id, {
                                      description: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <label className="block font-semibold text-sm mb-1">
                                  Duration or Distance
                                </label>
                                <div className="flex gap-2 items-center mb-2">
                                  <select
                                    className="border rounded px-2 py-1"
                                    value={
                                      child.distance !== undefined
                                        ? "distance"
                                        : "duration"
                                    }
                                    onChange={(e) => {
                                      if (e.target.value === "distance") {
                                        updateRepeatChild(block.id, child.id, {
                                          distance: 1,
                                          distanceUnit: "km",
                                          duration: undefined,
                                        });
                                      } else {
                                        updateRepeatChild(block.id, child.id, {
                                          duration: 0,
                                          durationStr: "00:00:00",
                                          distance: undefined,
                                          distanceUnit: undefined,
                                        });
                                      }
                                    }}
                                  >
                                    <option value="distance">Afstand</option>
                                    <option value="duration">Duur</option>
                                  </select>
                                  {child.distance !== undefined ? (
                                    <>
                                      <input
                                        type="number"
                                        className="border rounded px-2 py-1 w-20"
                                        value={child.distance}
                                        min={0}
                                        step={
                                          child.distanceUnit === "km" ? 0.01 : 1
                                        }
                                        onChange={(e) =>
                                          updateRepeatChild(
                                            block.id,
                                            child.id,
                                            {
                                              distance: e.target.value
                                                ? Number(e.target.value)
                                                : undefined,
                                            }
                                          )
                                        }
                                      />
                                      <select
                                        className="border rounded px-2 py-1"
                                        value={child.distanceUnit || "km"}
                                        onChange={(e) =>
                                          updateRepeatChild(
                                            block.id,
                                            child.id,
                                            {
                                              distanceUnit: e.target.value as
                                                | "km"
                                                | "m",
                                            }
                                          )
                                        }
                                      >
                                        <option value="km">km</option>
                                        <option value="m">m</option>
                                      </select>
                                    </>
                                  ) : (
                                    <input
                                      type="text"
                                      className="border rounded px-2 py-1 w-32 font-mono"
                                      placeholder="hh:mm:ss"
                                      value={child.durationStr || ""}
                                      pattern="^([0-9]{1,2}):([0-5][0-9]):([0-5][0-9])$"
                                      onChange={(e) => {
                                        // Parse hh:mm:ss to total minutes
                                        const match = e.target.value.match(
                                          /^([0-9]{1,2}):([0-5][0-9]):([0-5][0-9])$/
                                        );
                                        let duration = undefined;
                                        if (match) {
                                          const h = parseInt(match[1], 10);
                                          const m = parseInt(match[2], 10);
                                          const s = parseInt(match[3], 10);
                                          duration = h * 60 + m + s / 60;
                                        }
                                        updateRepeatChild(block.id, child.id, {
                                          duration: duration,
                                          durationStr: e.target.value,
                                        });
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                              <div>
                                <label className="block font-semibold text-sm mb-1">
                                  Intensity Goal
                                </label>
                                <select
                                  className="border rounded px-2 py-1 w-full"
                                  value={child.intensity}
                                  onChange={(e) =>
                                    updateRepeatChild(block.id, child.id, {
                                      intensity: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Geen doel</option>
                                  <option value="very easy">Very Easy</option>
                                  <option value="easy">Easy</option>
                                  <option value="medium">Medium</option>
                                  <option value="hard">Hard</option>
                                  <option value="very hard">Very Hard</option>
                                </select>
                              </div>
                              <div>
                                <label className="block font-semibold text-sm mb-1">
                                  Reps / Rest
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="number"
                                    className="border rounded px-2 py-1 w-20"
                                    placeholder="Reps"
                                    value={child.repetitions ?? ""}
                                    min={1}
                                    onChange={(e) =>
                                      updateRepeatChild(block.id, child.id, {
                                        repetitions: e.target.value
                                          ? Number(e.target.value)
                                          : undefined,
                                      })
                                    }
                                  />
                                  <input
                                    type="number"
                                    className="border rounded px-2 py-1 w-24"
                                    placeholder="Rest (sec/m)"
                                    value={child.restTime ?? ""}
                                    min={0}
                                    onChange={(e) =>
                                      updateRepeatChild(block.id, child.id, {
                                        restTime: e.target.value
                                          ? Number(e.target.value)
                                          : undefined,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null
                      )}
                      <button
                        type="button"
                        className="px-2 py-1 rounded bg-blue-100 text-blue-700 border border-blue-300 mt-2"
                        onClick={() => addRepeatChild(block.id)}
                      >
                        + Add Step
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={block.id}
                    className={`bg-white rounded-lg shadow border ${getBlockBorder(
                      block.type
                    )} mb-2 p-4 relative`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-lg">
                        {block.name || `Block ${idx + 1}`}
                      </span>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-600"
                        onClick={() => removeBlock(block.id)}
                        title="Remove Block"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                      <div>
                        <label className="block font-semibold text-sm mb-1">
                          Type
                        </label>
                        <select
                          className="border rounded px-2 py-1 w-full mb-2"
                          value={block.type}
                          onChange={(e) =>
                            updateBlock(block.id, {
                              type: e.target.value as Exercise["type"],
                            })
                          }
                          required
                        >
                          <option value="warmup">Warmup</option>
                          <option value="cooldown">Cooldown</option>
                          <option value="run">Run</option>
                          <option value="recovery">Recovery</option>
                          <option value="repeat">Repeat</option>
                        </select>
                        <label className="block font-semibold text-sm mb-1">
                          Details
                        </label>
                        <input
                          type="text"
                          className="border rounded px-2 py-1 w-full"
                          placeholder="Step name (e.g. Run, Rest, Warmup)"
                          value={block.name}
                          onChange={(e) =>
                            updateBlock(block.id, { name: e.target.value })
                          }
                          required
                        />
                        <textarea
                          className="border rounded px-2 py-1 w-full mt-2"
                          placeholder="Notes or description"
                          value={block.description}
                          maxLength={200}
                          onChange={(e) =>
                            updateBlock(block.id, {
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-sm mb-1">
                          Duration or Distance
                        </label>
                        <div className="flex gap-2 items-center mb-2">
                          <select
                            className="border rounded px-2 py-1"
                            value={
                              block.distance !== undefined
                                ? "distance"
                                : "duration"
                            }
                            onChange={(e) => {
                              if (e.target.value === "distance") {
                                updateBlock(block.id, {
                                  distance: 1,
                                  distanceUnit: "km",
                                  duration: undefined,
                                });
                              } else {
                                updateBlock(block.id, {
                                  duration: 0,
                                  durationStr: "00:00:00",
                                  distance: undefined,
                                  distanceUnit: undefined,
                                });
                              }
                            }}
                          >
                            <option value="distance">Afstand</option>
                            <option value="duration">Duur</option>
                          </select>
                          {block.distance !== undefined ? (
                            <>
                              <input
                                type="number"
                                className="border rounded px-2 py-1 w-20"
                                value={block.distance}
                                min={0}
                                step={block.distanceUnit === "km" ? 0.01 : 1}
                                onChange={(e) =>
                                  updateBlock(block.id, {
                                    distance: e.target.value
                                      ? Number(e.target.value)
                                      : undefined,
                                  })
                                }
                              />
                              <select
                                className="border rounded px-2 py-1"
                                value={block.distanceUnit || "km"}
                                onChange={(e) =>
                                  updateBlock(block.id, {
                                    distanceUnit: e.target.value as "km" | "m",
                                  })
                                }
                              >
                                <option value="km">km</option>
                                <option value="m">m</option>
                              </select>
                            </>
                          ) : (
                            <input
                              type="text"
                              className="border rounded px-2 py-1 w-32 font-mono"
                              placeholder="hh:mm:ss"
                              value={block.durationStr || ""}
                              pattern="^([0-9]{1,2}):([0-5][0-9]):([0-5][0-9])$"
                              onChange={(e) => {
                                // Parse hh:mm:ss to total minutes
                                const match = e.target.value.match(
                                  /^([0-9]{1,2}):([0-5][0-9]):([0-5][0-9])$/
                                );
                                let duration = undefined;
                                if (match) {
                                  const h = parseInt(match[1], 10);
                                  const m = parseInt(match[2], 10);
                                  const s = parseInt(match[3], 10);
                                  duration = h * 60 + m + s / 60;
                                }
                                updateBlock(block.id, {
                                  duration: duration,
                                  durationStr: e.target.value,
                                });
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                      <div>
                        <label className="block font-semibold text-sm mb-1">
                          Intensity Goal
                        </label>
                        <select
                          className="border rounded px-2 py-1 w-full"
                          value={block.intensity}
                          onChange={(e) =>
                            updateBlock(block.id, {
                              intensity: e.target.value,
                            })
                          }
                        >
                          <option value="">Geen doel</option>
                          <option value="very easy">Very Easy</option>
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                          <option value="very hard">Very Hard</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-sm mb-1">
                          Reps / Rest
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            className="border rounded px-2 py-1 w-20"
                            placeholder="Reps"
                            value={block.repetitions ?? ""}
                            min={1}
                            onChange={(e) =>
                              updateBlock(block.id, {
                                repetitions: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              })
                            }
                          />
                          <input
                            type="number"
                            className="border rounded px-2 py-1 w-24"
                            placeholder="Rest (sec/m)"
                            value={block.restTime ?? ""}
                            min={0}
                            onChange={(e) =>
                              updateBlock(block.id, {
                                restTime: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  className="px-3 py-1 rounded bg-green-100 text-green-700 border border-green-300"
                  onClick={addExerciseBlock}
                >
                  + Add Block
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded bg-blue-100 text-blue-700 border border-blue-300"
                  onClick={addRepeatBlock}
                >
                  + Add Repeat Block
                </button>
              </div>
            </div>
            {/* Timeline visualization below blocks */}
            {newWorkout.sport === "running" && (
              <div className="mt-8">
                <div className="flex items-center gap-1 relative min-h-[40px]">
                  {flattenBlocks(blocks).map((ex) =>
                    ex.type !== "repeat" ? (
                      <div
                        key={ex.id}
                        className={`rounded-md h-6 ${getBlockColor(
                          ex.type
                        )} flex items-center justify-center border border-gray-300 shadow-sm`}
                        style={{
                          width: ex.distance
                            ? Math.max(60, ex.distance * 30)
                            : 60,
                        }}
                        title={ex.name}
                      />
                    ) : null
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2 relative">
                  {getAxisTicks(blocks).map((tick, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center"
                      style={{ minWidth: 60 }}
                    >
                      <span className="text-xs text-gray-500">{tick} km</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default WorkoutModal;
