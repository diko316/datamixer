'use strict';


describe('DATAMIXER.subscribe([event:string], [callback:function]):function',
    function () {
        
        var MODEL = use('index.js');
        
        MODEL.define('TestEvent', {
                        type: {
                                id: 'integer',
                                name: 'text'
                            },
                        '@customEvent': 'event.dispatch'
                    });
        
        it('should subscribe all record events [event:string.format(modelName + ":" + modelMethod)]',
            function (done) {
                var record = MODEL('TestEvent', { id: 1, name: 'test'}),
                    stopCustomEvent = false,
                    eventMessage = {
                                    name: 'eventName',
                                    data: 'test value'
                                };
                
                // non function second parameter should fail
                try {
                    stopCustomEvent = MODEL.subscribe('Test')
                }
                catch (e) {
                    
                }
                
                assert(stopCustomEvent === false,
                    'should have valid [callback:function] 2nd parameter');
                
                // correct parameter should succeed
                try {
                    stopCustomEvent =
                        MODEL.subscribe('TestEvent:customEvent',
                            function (event) {
                                stopCustomEvent();
                                try {
                                    assert(
                                        event.data === eventMessage,
                                        'event object should pass event message as [data:mixed] property');
                                    
                                    assert(
                                        event.type === 'TestEvent:customEvent',
                                        'event object should have event type [type:string] property');
                                    
                                    assert(
                                        event.model === 'TestEvent',
                                        'event object should have registered model name [model:string] property');
                                    
                                    assert(
                                        event.method === 'customEvent',
                                        'event object should have name of method used to dispatch this event [method:string] property');
                                    
                                    assert(
                                        event.target === record,
                                        'event object should have instance of the model [target:Model] property');
                                    
                                    done();
                                }
                                catch (e) {
                                    done(e);
                                }
                            });
                }
                catch (e) {
                    done(e);
                }
                
                assert(stopCustomEvent instanceof Function,
                    'should return valid [stopEventSubscription:function] callback to stop event subscription when called');
                
                record.customEvent(eventMessage);
                
            });
        
        
        
    });