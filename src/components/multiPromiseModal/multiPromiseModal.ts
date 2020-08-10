import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { SizeType, AlignType, UIOptionType} from './type';
import {Radio} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Radio);


declare module 'vue/types/vue' {
    interface MultiPromiseModal extends Vue {
        on: (uiOption: UIOptionType, content: string, title?: string) => void;
        onResolve: () => void;
        onReject: () => void;
    }
}

@Component({
    name: 'multiPromiseModal'
})
export default class MultiPromiseModal extends Vue {
    private ui: {isOpen: boolean; size: SizeType; align: AlignType; negativeMessage?: string; positiveMessage?: string} = {
        isOpen: false,
        size: 'normal',
        align: 'center',
        negativeMessage: undefined,
        positiveMessage: '확인',
    };
    private radioButton = 1;
    private title?: string = undefined;
    private content = '';
    private resolve = () => {
        // empty function - lint error
    };
    private reject = () => {
        // empty function - lint error
    };
    get alignCenter () {
        return this.ui.align === 'center';
    }

    private on(uiOption: UIOptionType, content: string, title?: string) {
        if (!this.ui.isOpen) {
            this.title = title;
            this.content = content;
            this.ui.size = uiOption.size ? uiOption.size : 'normal';
            this.ui.align = uiOption.align ? uiOption.align : 'center';
            this.ui.negativeMessage = uiOption.negativeMessage ? uiOption.negativeMessage : undefined;
            this.ui.positiveMessage = uiOption.positiveMessage ? uiOption.positiveMessage : '확인';
            this.ui.isOpen = true;

            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        } else {
            console.log('modal already exist');
        }
    }

    private onResolve() {
        this.ui.isOpen = false;
        this.resolve();
    }
    private onReject() {
        this.ui.isOpen = false;
        this.reject();
    }
}