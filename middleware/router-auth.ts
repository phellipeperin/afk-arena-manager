// @ts-ignore
const middleware = ({ store, redirect, route }) => { // TODO check types
  const loggedUser = store.state.user.user;
  const isPublic = route.meta[0] && route.meta[0].public;
  const neededRole = route.meta[0]?.role || '';

  if (!isPublic && !loggedUser.id) {
    redirect('/');
  }
  if (isPublic && loggedUser.id) {
    redirect('/player/heroes');
  }
  if (!isPublic && loggedUser.id && (neededRole && !loggedUser.roles.includes(neededRole))) {
    redirect('/forbidden');
  }
};

export default middleware;
