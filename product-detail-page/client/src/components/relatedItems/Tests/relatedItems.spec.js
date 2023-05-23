import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import Overview from './overview/Overview';
import RelatedItems from './relatedItems/relatedItems';
import QuestionsAndAnswers from './questionsAndAnswers/QuestionsAndAnswers';
import Reviews from './ratingsAndReviews/reviews';

describe('App component', () => {
  it('should render correctly', () => {
    const wrapper = mount(<App />);

    // Check if the child components are rendered
    expect(wrapper.find(Overview)).toHaveLength(1);
    expect(wrapper.find(RelatedItems)).toHaveLength(1);
    expect(wrapper.find(QuestionsAndAnswers)).toHaveLength(1);
    expect(wrapper.find(Reviews)).toHaveLength(1);
  });
});