import {dateUtils} from '../dateUtils';

describe('formatRelative', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-12-16T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve retornar os segundos quando a diferença for menor que 60 segundos', () => {
    const result = dateUtils.formatRelative('2024-12-16T11:59:45Z');
    expect(result).toBe('15 s');
  });

  it('deve retornar os minutos quando a diferença for menor que 60 minutos', () => {
    const result = dateUtils.formatRelative('2024-12-16T11:30:00Z');
    expect(result).toBe('30 m');
  });

  it('deve retornar as horas quando a diferença for menor que 24 horas', () => {
    const result = dateUtils.formatRelative('2024-12-16T06:00:00Z');
    expect(result).toBe('6 h');
  });

  it('deve retornar os dias quando a diferença for menor que 7 dias', () => {
    const result = dateUtils.formatRelative('2024-12-10T12:00:00Z');
    expect(result).toBe('6 d');
  });

  it('deve retornar as semanas quando a diferença for menor que 4 semanas', () => {
    const result = dateUtils.formatRelative('2024-11-20T12:00:00Z');
    expect(result).toBe('3 sem');
  });

  it('deve retornar os meses quando a diferença for menor que 12 meses', () => {
    const result = dateUtils.formatRelative('2024-06-16T12:00:00Z');
    expect(result).toBe('6 m');
  });

  it('deve retornar a data formatada quando a diferença for maior ou igual a 12 meses', () => {
    const result = dateUtils.formatRelative('2023-12-16T12:00:00Z');
    expect(result).toBe('16/12/2023');
  });
});
