import { supabase } from "../../lib/supabase/supabase";

export default async function Test() {
    const { data, error } = await supabase
        .from("sensor")
        .select("*");

    console.log(data, error);
    return (
        <div>Hello</div>
    )
};

