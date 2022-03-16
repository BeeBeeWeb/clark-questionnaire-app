import React from "react";
import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

it('renders app', () => {
  render(<App />);
  const app = screen.getByTestId('app');
  expect(app).toBeInTheDocument();
});

describe('welcome flow', () => {
  const mockStore = configureStore();
  beforeEach(() => {
    
    const fakeQuestionnaire = {
      "questionnaire": {
        "id": 40,
        "identifier": "ewBzTS",
        "questions": [
          {
            "question_type": "multiple-choice",
            "identifier": "list_12110962",
            "headline": "Wen möchtest Du versichern?",
            "description": null,
            "required": false,
            "multiple": "false",
            "choices": [
              {
                "label": "Meine Familie mit Kindern",
                "value": "Meine Familie mit Kindern",
                "selected": false
              },
              {
                "label": "Meine Familie ohne Kinder",
                "value": "Meine Familie ohne Kinder",
                "selected": false
              },
              {
                "label": "Mich ohne Kind",
                "value": "Mich ohne Kind",
                "selected": false
              },
              {
                "label": "Mich mit Kind",
                "value": "Mich mit Kind",
                "selected": false
              },
              {
                "label": "Mich und meinen Lebenspartner",
                "value": "Mich und meinen Lebenspartner",
                "selected": false
              }
            ],
            "jumps": []
          }
        ],
        "name": "Privathaftpflichtversicherung",
        "description": "Um Dein persönliches Privathaftpflichtversicherungs-Angebot zu erstellen, benötigen wir noch ein paar Informationen von Dir.",
        "category_name_hyphenated": "Pri\u0026shy;vat\u0026shy;haft\u0026shy;pflicht"
      }
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeQuestionnaire)
      })
    );
  
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  
  it('initially renders welcome component', async () => {
    
    render(<App />);
  
    const welcomeElement = await screen.findByTestId('welcome');
    expect(welcomeElement).toBeInTheDocument();
  });

  it('renders questionnaire after user clicks get started', async() => {
    const initialState = {
      data: {
        savedResponse: new Map(),
        responded: false
      }
    };
    const store = mockStore(initialState)
    render(<Provider store={store}><App /></Provider>);
    const button = await screen.findByTestId('start-btn');
    // screen.debug();
    expect(button.textContent).toBe('Get started');

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const questionnaire = screen.getByTestId('questionnaire');

    expect(questionnaire).toBeInTheDocument();
  })
})

