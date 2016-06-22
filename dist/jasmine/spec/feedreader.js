$(function(){window.jasmine.DEFAULT_TIMEOUT_INTERVAL=2e4,describe("RSS Feeds",function(){it("are defined",function(){expect(allFeeds).toBeDefined(),expect(allFeeds.length).not.toBe(0)}),it("each feed URL is defined and not empty",function(){allFeeds.forEach(function(e){expect(e.url).toBeDefined(),expect(e.url).not.toEqual("")})}),it("each feed NAME is defined and not empty",function(){allFeeds.forEach(function(e){expect(e.name).toBeDefined(),expect(e.name).not.toEqual("")})})}),describe("The menu",function(){var e;beforeEach(function(){e=$("body")[0]}),it("menu is hidden by default",function(){expect("menu-hidden"===e.getAttribute("class")).toBeTruthy()}),it("display when clicked and hide when clicked again",function(){$("body").addClass("menu-hidden"),$(".menu-icon-link").trigger("click"),expect("menu-hidden"===e.getAttribute("class")).toBeFalsy(),$(".menu-icon-link").trigger("click"),expect("menu-hidden"===e.getAttribute("class")).toBeTruthy()})}),describe("Initial Entries",function(){var e=!0;beforeEach(function(t){var n=loadFeed(0,function(){e="OK"===n.statusText?!0:!1,t()})}),it("when loadFeed completes a single .entry is within the .feed cotainer",function(){if(!e)throw Error("JQuery Call didn't send back any data");expect($(".feed").find(".entry").length).toBeGreaterThan(0)})}),describe("New Feed Selection",function(){var e,t,n=!1;beforeEach(function(t){var i=loadFeed(1,function(){e=$(".feed").html(),n="OK"===i.statusText?!0:!1,t()})}),beforeEach(function(e){if(n)var i=loadFeed(2,function(){t=$(".feed").html(),n="OK"===i.statusText?!0:!1});e()}),it("when new feed is loaded the content actually changes",function(){if(!n)throw Error("JQuery Call didn't send back any data");expect(e).not.toEqual(t)})}),describe("[Additional Test] The order icon",function(){var e=!0;beforeEach(function(t){var n=loadFeed(3,function(){$(".order-icon-items").trigger("click"),e="OK"===n.statusText?!0:!1,t()})}),it("when clicked the feed list get ordered by title",function(){var t="";if(!e)throw Error("JQuery Call didn't send back any data");$("article").each(function(e,n){expect($(t).find("h2").text().toLowerCase()).toBeLessThan($(n).find("h2").text().toLowerCase()),t=n})})})}());