import { TestBed, async } from '@angular/core/testing';
import { DataListService } from './data-list.service';
import { HttpClient } from '@angular/common/http';

describe('DataListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataListService = TestBed.get(DataListService);
    expect(service).toBeTruthy();
  });

});
