SalesforceInteractions.init({
    account: "axxonconsultingsa",
    dataset: "mvcatalog",
    cookiedomain: "https://catalogmv.netlify.app/",
    trackerUrl: "https://axxonconsultingsa.us-5.evergage.com",
  }).then(() => {
        const sitemapConfig = {
        global: {
            onActionEvent: (actionEvent) => {
                return actionEvent;
            },
            contentZones: [
                { name: "category 1", selector: "#category-1" },
                { name: "category 2", selector: "#category-2" },
                { name: "category 3", selector: "#category-3" } 
            ],
            listeners: [
                SalesforceInteractions.listener("click", "#category-1", () => {
                    const customer = SalesforceInteractions.cashDom(".form-control").val();
                    if(customer) {

                        SalesforceInteractions.sendEvent({
                            action: "click on cat1",  
                            user: {
                                customerId: "customerIDtest",
                                id: "idTest",
                                attributes: {
                                    emailAddress: "test@test.com"
                                }
                            }
                        })

                        Evergage.sendEvent({
                            itemAction: Evergage.ItemAction.ViewItem,
                            catalog: {
                                Product: {
                                    _id: "testProdID",
                                    Color: "blue"
                                }
                            }
                        })
                        
                    }
                })
            ]
        },
        pageTypeDefault: {
            name: "default",
            interaction: {
                name: "Default Page"
            } 
        }, 
        pageTypes: [
            {
                name: "home",
                action: "Homepage",
                isMatch: () => {
                    return SalesforceInteractions.cashDom(".nav-item nav-link active").val() === "Home";
                },
                catalog: {
                    Product: {
                        _id: "productIDtest",
                        name: Evergage.resolvers.fromJsonLd("name")
                    }
                },
                contentZones: [
                    { name: "category 1", selector: "#category-1" },
                    { name: "category 2", selector: "#category-2" },
                    { name: "category 3", selector: "#category-3" }
                ],
            }
        ],
    };
  
    SalesforceInteractions.initSitemap(sitemapConfig);
  });