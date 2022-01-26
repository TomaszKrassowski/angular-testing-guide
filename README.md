# AngularTestingGuide

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Cheatsheet

### Running lifecycle hooks of component
All lifecycle hooks are called by testing engine after calling "detectChanges" function of fixture.

```typescript
beforeEach(() => {
  fixture = TestBed.createComponent(Component);
  component = fixture.componentInstance;
  fixture.detectChanges(); // <-- will call onChanges, onInit, ...
});
```

### Querying HTML 
To read attributes or values of DOM nodes, you must use debugElement of a component fixture:

```typescript
import {By} from "@angular/platform-browser";

beforeEach(() => {
  fixture = TestBed.createComponent(Component);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

it('should get node', () => {
  const divWithSomeTextContent = fixture.debugElement.query(By.css('div.some-class'));
  expect(divWithSomeTextContent.nativeElement.textContent).toContain("expected text");
});
```

### Testing a service which returns an Observable

Services mostly return values from Observables as many of them deal with asynchronous tasks. Callback function passed
to "subscribe" function is actually placed on a queue, which will be checked after "main" test function is already
executed (simplified). To actually verify that the callback has been called, you may use "done" function - which is an
argument of the function placed as second argument of "it" function.

```typescript
it('getObservableValue should return value from observable', (done: DoneFn) => {
  service.getObservableValue().subscribe(value => {
    expect(value).toBe('observable value');
    done();
  });
});
```

### Testing a service with time flow

Because of the asynchronous nature of Observables, sometimes there is a need to simulate time passage. For example: a
service uses rxjs timer with delay of 2 minutes to emit some value from its subject. To simulate time passage in angular
zone.js, as the second argument of "it" function, special "fakeAsync" callback must be passed. Then "tick" function can
be called to pass the time.

```typescript
it('should pass 3 seconds', fakeAsync(() => {
  const result = [];

  interval(1000).subscribe((emittedValue) => result.push(emittedValue));
  tick(3000);

  expect(result).toEqual([0, 1, 2]);
}));
```

There is one catch - if the setup of timer happens before fakeAsync zone is declared, it will be outside the simulated
time flow.

```typescript
// Component example
class MyComponent implements NgOnInit {
  public emitedItems: number[] = [];

  onInit() {
    timer(2000).subscribe(v => this.emitedItems.push(v));
  }
}

// ... boilerplate of the testcase

beforeEach(() => {
  fixture.detectChanges(); // this will run angular lifecycle hooks - timer will start right now
});

it('should contain one item after 2,5 seconds', fakeAsync(() => {
  tick(2500);
  expect(component.emitedItems).toEqual([0]); // this might fail
}));
```

### Testing service which uses HTTPClient to make an HTTP request

You can add a HttpClientTestingModule to the testing module to mock HTTPClient.  
It provides a HttpTestingController class which allows verifying expected URLs were called, and emitting values for
these calls.

To verify that URL was called, you may use "expectOne" method from HttpTestingController class. This function must be
called after the service has made a call to it's HttpClient property, otherwise the expectation will fail.

To return some items to the service, first you must assign object returned by "expectOne" to a variable. This object
has "verify" method, which can be called with any object as an argument - this object will be returned to "get", "post",
etc. method inside a service.

```typescript
import {TestBed, getTestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {YourService} from './your-service.service.ts'

describe('YourService', () => {
  let service: YourService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubApiService]
    });
    const injector = getTestBed();
    service = injector.get(GithubApiService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should call expected url', (done) => {
    service.someMethodWhichCallsHttpClientMethod().subscribe((emittedItems) => {
      expect(emittedItems).toEqual(["itemToBeEmitted1", "itemToBeEmitted2"]);
      done()
    });

    const request = httpMock.expectOne('https://example.com/expected');
    request.flush(["itemToBeEmitted1", "itemToBeEmitted2"]);
  })

});
```

### Mocking service/component dependency

Dependency Injection Tokens are injected using a constructor of a class. You may use providers array to declare services
which will be available for injection. To inject spies or mocks of needed services you may use jasmine to create objects
and use provider object:

```typescript
class ComponentWithServiceDependency implements NgOnInit {
  constructor(private yourService: YourService, private otherService: SomeService) {
  }

  onInit() {
    this.yourService.method1.subscribe((v) => {
    });
    this.otherService.method1.subscribe((v) => {
    });
  }
}

describe('ComponentWithServiceDependency', () => {
  let component: ComponentWithServiceDependency;
  let fixture: ComponentFixture<ComponentWithServiceDependency>;

  let serviceSpy: jasmine.SpyObj<YourService>;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj("YourService", ["method1"]);
    // assign value to return:
    serviceSpy.method1.and.returnValue(of(["item1"])); // when component subscribes to method1, it will recive array with item

    // can be also written as:
    serviceSpy = jasmine.createSpyObj("YourService", {
      "method1": of(["item1"]),
    });

    await TestBed.configureTestingModule({
      declarations: [ComponentWithServicesDependency],
      providers: [
        {provide: YourService, useValue: serviceSpy},
        NormalService
      ]
    })
      .compileComponents();
  });

});
```
