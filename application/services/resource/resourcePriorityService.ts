const getPriorityColor = (priority: number): string => {
  switch (priority) {
    case 0: { return 'none'; }
    case 1: { return 'elite'; }
    case 2: { return 'legendary'; }
    case 3: { return 'mythic'; }
    case 4: { return 'ascended'; }
  }
  return 'none';
};

export {
  getPriorityColor,
};
