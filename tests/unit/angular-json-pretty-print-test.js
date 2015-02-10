describe('Unit test to print JSON object in pretty way', function() {
  var $compile,
      $rootScope;

  beforeEach(module('JsonPrettyPrint'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Get the result of JSON object', function() {
    var element = $compile("<rm-json-pretty-print></rm-json-pretty-print>")($rootScope);
    
    $rootScope.$digest();
    
    expect(element.html()).toEqual('{"key1":"value1"}');
  });
});