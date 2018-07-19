const Bus = Vuedals.Bus;
const Component = Vuedals.Component;
const Plugin = Vuedals.default;

Vue.use(Plugin);

const ModalComponent = {
    name: 'ajax-modal-component',
    template: `<div>{{ content }}</div>`,
    props: ['content']
};

new Vue({
    name: 'ajax-example',
    el: '#app',

    components: {
        vuedals: Component,
    },

    methods: {
        openModal() {

            Bus.$emit('new', {
                title: 'New modal window',
                component: ModalComponent,
                showHeader: false,
                async(options) {
                    let data = {
                        content: 'Loaded data from slow network'
                    };

                    return new Promise((resolve) => {
                        setTimeout(() => {
                            options.showHeader = true;
                            options.props = data;

                            resolve(options);
                        }, 2000)
                    });
                }
            });
        }
    },

    template: `<div>
        <p>
            <h3>Simulate loading modal by AJAX</h3>
            <span class="btn btn-primary" @click="openModal()">Load</span>
        </p>

        <vuedals>
            <div slot="loader">Loading content...</div>
        </vuedals>
    </div>`
});