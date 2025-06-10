import React from 'react';
import { Workout } from '../../types';
import { Clock, MapPin, Zap, Calendar, Users } from 'lucide-react';

interface WorkoutCardProps {
  workout: Workout;
  onEdit?: () => void;
  onAssign?: () => void;
  showActions?: boolean;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ 
  workout, 
  onEdit, 
  onAssign, 
  showActions = true 
}) => {
  const getTypeColor = (type: string) => {
    const colors = {
      easy_run: 'from-green-400 to-emerald-500',
      tempo: 'from-orange-400 to-red-500',
      intervals: 'from-red-400 to-pink-500',
      long_run: 'from-blue-400 to-indigo-500',
      recovery: 'from-gray-400 to-slate-500',
      strength: 'from-purple-400 to-violet-500',
    };
    return colors[type as keyof typeof colors] || 'from-gray-400 to-slate-500';
  };

  const getIntensityIcon = (intensity: string) => {
    const count = intensity === 'low' ? 1 : intensity === 'medium' ? 2 : 3;
    return [...Array(3)].map((_, i) => (
      <Zap
        key={i}
        className={`h-4 w-4 transition-all duration-200 ${
          i < count ? 'text-yellow-500 fill-current drop-shadow-sm' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
            {workout.title}
          </h3>
          <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full text-white bg-gradient-to-r ${getTypeColor(workout.type)} shadow-lg`}>
            {workout.type.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-100 to-orange-100 p-2 rounded-xl">
          {getIntensityIcon(workout.intensity)}
        </div>
      </div>

      <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{workout.description}</p>

      <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
        <div className="flex items-center bg-blue-50 px-3 py-2 rounded-xl">
          <Clock className="h-4 w-4 mr-2 text-blue-500" />
          {workout.duration} min
        </div>
        {workout.distance && (
          <div className="flex items-center bg-green-50 px-3 py-2 rounded-xl">
            <MapPin className="h-4 w-4 mr-2 text-green-500" />
            {workout.distance} mi
          </div>
        )}
        {workout.scheduledDate && (
          <div className="flex items-center bg-purple-50 px-3 py-2 rounded-xl">
            <Calendar className="h-4 w-4 mr-2 text-purple-500" />
            {new Date(workout.scheduledDate).toLocaleDateString()}
          </div>
        )}
      </div>

      {workout.assignedTo && workout.assignedTo.length > 0 && (
        <div className="flex items-center mb-6 text-sm text-gray-600 bg-orange-50 px-3 py-2 rounded-xl w-fit">
          <Users className="h-4 w-4 mr-2 text-orange-500" />
          Assigned to {workout.assignedTo.length} athlete{workout.assignedTo.length !== 1 ? 's' : ''}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-xl">
          {workout.exercises.length} exercise{workout.exercises.length !== 1 ? 's' : ''}
        </div>
        
        {showActions && (
          <div className="flex space-x-3">
            {onEdit && (
              <button
                onClick={onEdit}
                className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium hover:scale-105"
              >
                Edit
              </button>
            )}
            {onAssign && (
              <button
                onClick={onAssign}
                className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Assign
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;