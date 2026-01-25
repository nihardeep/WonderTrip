import { useEffect } from 'react';

const HotelDealsWidget = () => {
    useEffect(() => {
        // Check if script is already present to prevent duplicate loading
        if (document.getElementById('klook-affiliate-script')) return;

        const script = document.createElement('script');
        script.id = 'klook-affiliate-script';
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://affiliate.klook.com/widget/fetch-iframe-init.js';

        // Append to body or head
        document.body.appendChild(script);

        return () => {
            // Cleanup if needed? Usually remote widgets are tricky to cleanup, 
            // but we can leave it or remove script on unmount. 
            // For global scripts, often better to leave it if it might be reused, 
            // but cleaning up is cleaner.
            // document.body.removeChild(script); 
        };
    }, []);

    return (
        <div className="w-full flex justify-center py-8">
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
                data-total="6"
            >
                <a href="//www.klook.com/">Klook.com</a>
            </ins>
        </div>
    );
};

export default HotelDealsWidget;
