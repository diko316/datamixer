'use strict';


describe('DATAMIXER.subscribe([event:string], [callback:function]):function',
    function () {
        
        var MODEL = use('index.js');
        
        MODEL.define('TestEvent', {
                        type: {
                                id: 'integer',
                                name: 'text'
                            },
                        '@customEvent': [
                            function (data) {
                                console.log('passing data: ', data);
                                return data;
                            },
                            'event.dispatch']
                    });
        
        it('should subscribe all record events [event:string.format(modelName + ":" + modelMethod)]',
            function (done) {
                var record = MODEL('TestEvent', { id: 1, name: 'test'}),
                    stopCustomEvent = false,
                    eventMessage = {
                                    name: 'eventName',
                                    data: 'test value'
                                };
                
                try {
                    stopCustomEvent = MODEL.subscribe('Test')
                }
                catch (e) {
                    
                }
                
                assert(stopCustomEvent === false,
                    'should have valid [callback:function] 2nd parameter');
                
                try {
                    stopCustomEvent = MODEL.subscribe('TestEvent:customEvent',
                                                function () {
                                                    console.log('event called', arguments);
                                                    stopCustomEvent();
                                                    done();
                                                });
                }
                catch (e) {
                    
                }
                
                assert(stopCustomEvent instanceof Function,
                    'should return valid [stopEventSubscription:function] callback to stop event subscription when called');
                
                record.customEvent(eventMessage);
                
            });
        
        
        
    });