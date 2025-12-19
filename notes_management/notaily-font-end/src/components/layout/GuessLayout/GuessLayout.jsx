import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import GuessHeader from '../../Header/GuessHeader/GuessHeader';
import "./GuessLayout.scss"
function GuessLayout() {

    return (
        <>
            <div className="guess-layout-default">
                <div className="guess-layout-default__content">
                    <GuessHeader/>
                    <main className="layout-default__main">
                        <Outlet />
                    </main>
                    <footer className="layout-default__footer">
                        Copyright @Nguyen Minh Tam
                    </footer>
                </div>
            </div>
        </>
    )
}

export default GuessLayout;