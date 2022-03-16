import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Questionnaire from './components/questionnaire/questionnaire.component';
import Welcome from './components/welcome/welcome.component';

function App() {
  const [questionnaireData, setQuestionnaireData] = useState(null);
  const [isStarted, setIsStarted] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch('questionnaire.json');
      let parsed = await response.json();
      setQuestionnaireData(parsed.questionnaire);
    }

    fetchData();
  }, []);

  const onStart = () => {
    setIsStarted(false);
  }
  
  return (
    <div className="App" data-testid="app">
      <header className="header">
        <img className="header__logo" src={logo} alt="logo" />
      </header>

      {!isStarted && questionnaireData && <Questionnaire questions={questionnaireData.questions} />}

      {isStarted && questionnaireData && <Welcome name={questionnaireData.name} description={questionnaireData.description} onStart={onStart} />}

      {!questionnaireData && 'Loading...'}

    </div>
  );
}

export default App;
