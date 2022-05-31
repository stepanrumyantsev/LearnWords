export const handleDelete = (id, Location) => {
    const items = JSON.parse(localStorage.getItem(Location) || "{}");
    if (items.length) {
        const result = items.filter(item => !(item.id.includes(id) || item.parent.includes(id)));
        localStorage.setItem(Location, JSON.stringify(result));
    }
};

export const langToFlag = (lang) => {

    switch (lang) {
        case "EN":
            return <span>&#127468; &#127463; </span>;

        case "DE":
            return <span>&#127465; &#127466; </span>;

        case "RU":
            return <span>&#127479; &#127482; </span>;

        case "ES":
            return <span>&#127466; &#127480; </span>;

        case "FR":
            return <span>&#127467; &#127479; </span>



        default:
            return "";
    }




}


export const countChildren = (id) => {
    let counter = 0;
    const items = JSON.parse(localStorage.getItem("dictionary") || "{}");

    if (items.length) {
        items.forEach(function (index, value) {
            if (items[value].parent.includes(id)) {
                counter = counter + 1;

            }
        });
        return counter;

    }
}