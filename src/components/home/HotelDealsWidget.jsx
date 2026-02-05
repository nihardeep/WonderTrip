import { useEffect } from 'react';

const HotelDealsWidget = () => {
    useEffect(() => {
        // Function to load the script
        const loadScript = () => {
            // Check if script is already present to prevent duplicate loading
            if (document.getElementById('klook-affiliate-script')) return;

            const script = document.createElement('script');
            script.id = 'klook-affiliate-script';
            script.type = 'text/javascript';
            script.async = true;
            script.src = 'https://affiliate.klook.com/widget/fetch-iframe-init.js';

            // Append to head for better reliability
            document.head.appendChild(script);
        };

        loadScript();

        return () => {
            // Cleanup script on unmount
            const existingScript = document.getElementById('klook-affiliate-script');
            if (existingScript) {
                // Try removing from both head and body just to be safe
                existingScript.remove();
            }

            // Note: Klook script might modify the DOM or window object, 
            // but removing the script tag forces a re-fetch on next mount.
        };
    }, []);

    return (
        <section className="py-16 bg-white">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                        Featured Deals
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Unlock exclusive savings on top-rated stays worldwide.
                    </p>
                </div>

                <div className="w-full flex justify-center">
                    <ins
                        className="klk-aff-widget"
                        data-aid="109497"
                        data-city_id=""
                        data-country_id=""
                        data-tag_id="0"
                        data-currency=""
                        data-lang=""
                        data-label1=""
                        data-label2=""
                        data-label3=""
                        data-prod="deals_widget"
                        data-total="4"
                        style={{ display: 'block', width: '100%' }}
                    >
                        <a href="//www.klook.com/">Klook.com</a>
                    </ins>
                </div>
            </div>
        </section>
    );
};

export default HotelDealsWidget;
