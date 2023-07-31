import { useState } from "react";
import Modal from "../Modal";
import SettingsModalNav from "./SettingsModalNav";
import CategoryTab from "./tabs/CategoryTab";
import AccountTab from "./tabs/AccountTab";

export default function SettingsModal() {

    const [currentTab, setCurrentTab] = useState('categories');

    return (
        <Modal title="Settings">
            <div className="flex w-full">
                <SettingsModalNav currentTab={currentTab} setCurrentTab={setCurrentTab} />

                <div className="basis-3/4 pl-2">
                    {
                        {
                            'categories': <CategoryTab />,
                            'account': <AccountTab />
                        }[currentTab]
                    }
                </div>
            </div>
        </Modal>
    )
}