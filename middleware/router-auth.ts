// @ts-ignore
const middleware = ({ store, redirect, route }) => { // TODO check types
  const hasLoggedUser = store.state.user.user && store.state.user.user.id;
  const isPublic = !!route.meta[0].public;

  if (!isPublic && !hasLoggedUser) {
    redirect('/');
  }
  if (isPublic && hasLoggedUser) {
    redirect('/player/heroes');
  }
  if (!isPublic && hasLoggedUser && (route.meta[0].role && !store.state.user.user.roles.includes(route.meta[0]))) {
    redirect('/forbidden');
  }
};

export default middleware;
