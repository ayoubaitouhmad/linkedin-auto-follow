(function () {
    // Select the target node where the changes might happen
    var targetNode = document.body;
    var sss = "People you may know based on your recent activity";
    var observerConfig = {childList: true, subtree: true};
    var scrollCountDefault = 2;
    var scrollCount = 0;
    // Create a MutationObserver instance
    var observer = new MutationObserver(function (mutationsList, observer) {
        // console.log("Start searching people container...  ")
        if ($(`.discover-sections-list__item:has(h2:contains(${sss}))`).first().length) {
            run($(`.discover-sections-list__item:has(h2:contains(${sss}))`).first());
            observer.disconnect();

        }
    });

    observer.observe(targetNode, observerConfig);

    function run(peoplesContainer) {
        let btnShowAll = peoplesContainer.find(".discover-section-header").find("button");
        btnShowAll.click();
        observer = new MutationObserver(function (mutationsList, observer) {
            console.log("Start searching people container modal ...  ")
            let entitiesModalContainer = $(".artdeco-modal.artdeco-modal--layer-default.discover-cohort-recommendations-modal");
            let entitiesModalContent = entitiesModalContainer.find(".artdeco-modal__content");

            if (entitiesModalContainer.length) {

                let entitiesScroleAble = entitiesModalContainer.find(".scaffold-finite-scroll__content");
                if (entitiesScroleAble.length) {


                    scrollToLastEntity(entitiesModalContainer)

                    observer.disconnect()
                }

            }

        });
        observer.observe(targetNode, observerConfig);
    }


    function scrollToLastEntity(entitiesModalContainer) {
        let entitiesModalContent = entitiesModalContainer.find(".artdeco-modal__content");
        let entitiesScroleAble = entitiesModalContainer.find(".scaffold-finite-scroll__content");
        let entities = entitiesScroleAble.find(".discover-fluid-entity-list--item");
        if (scrollCount < scrollCountDefault) {
            scrollCount++;
            entitiesModalContent.scrollTop($(entities.last()).offset().top);
            for (let i = 0; i < scrollCountDefault; i++) {
                setTimeout(function () {
                    entitiesModalContent.scrollTop(0);
                    scrollToLastEntity(entitiesModalContainer);
                }, 1000);
            }

        } else {
            connect(entitiesModalContainer);
        }
    }

    function connect(entitiesModalContainer) {
        let entitiesModalContent = entitiesModalContainer.find(".artdeco-modal__content");
        let entitiesScroleAble = entitiesModalContainer.find(".scaffold-finite-scroll__content");
        let entities = entitiesScroleAble.find(".discover-fluid-entity-list--item");
        entities.each(function (index) {
            let entity = $(this);
            setTimeout(function () {
                console.log(
                    entity.find(".discover-person-card__name").text().trim()
                )
            }, 1000);
        });
    }


})();