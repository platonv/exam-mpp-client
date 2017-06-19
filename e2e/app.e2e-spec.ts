import { ExamWebPage } from './app.po';

describe('exam-web App', () => {
  let page: ExamWebPage;

  beforeEach(() => {
    page = new ExamWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
