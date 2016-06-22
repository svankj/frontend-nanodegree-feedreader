$(function() {
    // Set Jasmine Timeout to handle even very slow network
    window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    /* Test suite for RSS Feeds */
    describe('RSS Feeds', function() {

        /* Test to make sure that the allFeeds variable has been defined
         * and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in allFeeds object
         * and checks that every element has defined (toBeDefined())
         * an url and it's not empty (not.toEqual('')).
         */
        it('each feed URL is defined and not empty', function () {
            // For every allFeeds element
            allFeeds.forEach( function(element) {
                // Check the url to be defined
                expect(element.url).toBeDefined();
                // Check the url it's not empty
                expect(element.url).not.toEqual('');
            });
        });

        /* This test loops through each feed in allFeeds object
         * and checks that for every elements a name is defined
         * (toBeDefined()) and it's not empty (not.toEqual('')).
         */
        it('each feed NAME is defined and not empty', function () {
            // For every allFeeds element
            allFeeds.forEach( function(element) {
                // Check the name to be defined
                expect(element.name).toBeDefined();
                // Check the name it's not empty
                expect(element.name).not.toEqual('');
            });
        });
    });

    /* Test suite for the menu */
    describe('The menu', function() {

        /* This test checks if at the beginning by default the
         * menu element is hidden checking if the class that makes
         * to hide the menu is present in the body element.
         */
        it('menu is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* This test verifies if the click on th menu icon to open and
         * close the menu works like it should. Starting with close menu
         * one click open so the class menu-hidden has removed from the body
         * element and click again close the menu so the class menu-hidden
         * appears in the body element.
         */
        it('display when clicked and hide when clicked again', function () {
            // Starting with menu closed
            $('body').addClass('menu-hidden');
            // Trigger the click event
            $('.menu-icon-link').trigger('click');
            // Expect menu open
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            // Trigger again the click event
            $('.menu-icon-link').trigger('click');
            // Expect menu close
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* Test suite for the initial entries */
    describe('Initial Entries', function() {
        var isOk = true;

        /* Wait that loadFeed has completed its work */
        beforeEach(function (done) {
            // Load loadFeed with id=0 as at the beginning
            var error = loadFeed(0, function () {
                isOk = (error.statusText === 'OK');
                done();
            });
        });

        /* This test checks that at the beginning after loadFeed function has completed
         * at least there is a single .entry within the .feed container.
         */
        it('when loadFeed completes a single .entry is within the .feed cotainer', function () {
            // Check that the length of .feed .entry is > 0
            if(isOk)
                expect($('.feed .entry').length).toBeGreaterThan(0);
            else
                throw new Error("JQuery Call didn't send back any data");
        });
    });

    /* Test suite for new feed selection */
    describe('New Feed Selection', function() {
        var feedFirstUpdate;
        var feedSecondUpdate;
        var isOk = false;

        /* Wait that loadFeed has completed its work */
        beforeEach(function (done) {
            // Load the loadFeed with id=1 different to starting value
            var error = loadFeed(1, function () {
                // Save the resulted html
                feedFirstUpdate = $('.feed').html();
                isOk = (error.statusText === 'OK');
                done();
            });
        });

        /* In second order wait that loadFeed has completed its work */
        beforeEach(function (done) {
            // Load the loadFeed with id=1 different to starting value
            var error = loadFeed(2, function () {
                // Save the resulted html
                feedSecondUpdate = $('.feed').html();
                isOk = (error.statusText === 'OK');
                done();
            });
        });

        /* This test checks that after a new feed is loaded by the
         * loadFeed function the content changes.
         */
        it('when new feed is loaded the content actually changes', function () {
            // Expect the two results saved to be different
            if(isOk)
                expect(feedFirstUpdate).not.toEqual(feedSecondUpdate);
            else
                throw new Error("JQuery Call didn't send back any data");
        });
    });

    /* Test suite for the order button */
    describe('[Additional Test] The order icon', function() {
        var isOk = true;

        /* Wait that loadFeed has completed its work */
        beforeEach(function (done) {
            // Load loadFeed with id=3
            var error = loadFeed(3, function () {
                // Trigger the click event
                $('.order-icon-items').trigger('click');
                isOk = (error.statusText === 'OK');
                done();
            });
        });

        /* This test verifies that when the order icon has pressed the
         * actual feed list is ordered lexicographically by the title.
         */
        it('when clicked the feed list get ordered by title', function () {
            var oldValue = '';
            if(isOk) {
                // Loop through each article element comparing two elements at the time
                $('article').each(function (index, value) {
                    // Expect that the old value is less great than the new one
                    expect($(oldValue).find('h2').text().toLowerCase()).toBeLessThan($(value).find('h2').text().toLowerCase());
                    // Save the last value for the next comparison
                    oldValue = value;
                });
            }
            else
                throw new Error("JQuery Call didn't send back any data");
        });
    });

}());