import { defineStore } from "pinia";
import { reactive } from "vue";

interface iTab {
    name: string;
    active: boolean;
}

export const useTabStore = defineStore(
    "tabStore",
    () => {
        const openTabs = reactive<Array<iTab>>([]);

        function addTab(tab: iTab) {
            let isNewTab: boolean = true;
            for (const ele of openTabs) {
                if (ele.name == tab.name) {
                    isNewTab = false;
                    break;
                }
            }
            isNewTab && openTabs.push(tab);
        }

        function reduceTab(name: string) {
            let idx: number = -1;
            const len = openTabs.length;
            for (let i = 0; i < len; i++) {
                if (openTabs[i].name == name) {
                    idx = i;
                }
            }
            if (idx > -1) {
                openTabs.splice(idx, 1);
            }
        }

        return { openTabs, addTab, reduceTab };
    },
    {
        persist: true,
    }
);
