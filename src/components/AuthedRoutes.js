import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navigation from './Navigation';
import Home from './Home';
import QuestionPreview from './QuestionPreview';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import PageNotFound from './PageNotFound';

class AuthedRoutes extends Component {
    render() {
        return (
            <Router>
                <Container>
                    <Navigation />
                    <main>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/questions/:id" component={QuestionPreview} />
                            <Route path="/add" component={NewQuestion} />
                            <Route path="/leaderboard" component={LeaderBoard} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </main>
                </Container>
            </Router>
        );
    }
}

export default AuthedRoutes;
