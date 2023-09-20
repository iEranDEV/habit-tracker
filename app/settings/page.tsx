import GeneralSettingsForm from "@/components/forms/GeneralSettingsForm";
import { Separator } from "@/components/ui/separator";

export default function GeneralSettingsPage() {

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">General</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator />
            {/* <GeneralSettingsForm /> */}
        </div>
    )
}