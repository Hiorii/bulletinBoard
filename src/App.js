import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import Homepage  from './components/views/Homepage/HomepageContainer';
import Login from './components/views/Login/Login';
import UserView from './components/views/UserView/UserViewContainer';
import UserEdit from './components/views/UserEdit/UserEditContainer';
import Post from './components/views/Post/PostContainer';
import MyPost from './components/views/MyPost/MyPostContainer';
import PostEdit from './components/views/PostEdit/PostEditContainer';
import PostAdd from './components/views/PostAdd/PostAddContainer';
import PostList from './components/views/PostList/PostListContainer';
import NotFound from './components/views/NotFound/NotFound';

import './styles/global.scss';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/user' component={UserView} />
              <Route exact path='/user/:id' component={UserEdit} />
              <Route exact path='/post/add' component={PostAdd} />
              <Route exact path='/post/list' component={PostList} />
              <Route exact path='/post/myPost' component={MyPost} />
              <Route exact path='/post/:id' component={Post} />
              <Route exact path='/post/:id/edit' component={PostEdit} />
              <Route path='*' component={NotFound} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

export { App };
