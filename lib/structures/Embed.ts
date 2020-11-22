interface LooseObject {
    [key: string]: any
}

export default class Embed {
    private _EmbedObject: LooseObject = {}
    constructor() {
        this._EmbedObject.fields = []
        this._EmbedObject.footer = {name: "", url: ""}
        this._EmbedObject.author = {name: "", url: "", icon_url: ""}
    }
    set color(color: number) {
        this._EmbedObject.color = color;
    }

    set title(title: string) {
        this._EmbedObject.title = title;
    }

    set description(description: string) {
        this._EmbedObject.description = description;
    }

    set url(url: string) {
        this._EmbedObject.url = url;
    }

    setFooter(text: string, url: string) {
        this._EmbedObject.footer.text = text;
        this._EmbedObject.footer.url = url;
    }

    setAuthor(name: string, url: string, iconUrl: string) {
        this._EmbedObject.author.name = name;
        this._EmbedObject.author.url = url;
        this._EmbedObject.icon_url = iconUrl;
    }

    addField(name: string, value: string, inline: boolean) {
        let tempObj = {"name":name, "value": value, "inline": inline}
        this._EmbedObject.fields.push(tempObj)
    }

    get build() {
        return this._EmbedObject;
    }

}