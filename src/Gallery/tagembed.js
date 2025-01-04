var TagAppEmbed = TagAppEmbed || function (t, e) {
    function a(t) {
        for (var e = "", a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", d = 0; d < t; d++) e += a.charAt(Math.floor(62 * Math.random()));
        return e
    }

    return {
        init: function () {
            var t = document.getElementsByClassName("tagembed-socialwall").length,
                e = document.getElementsByClassName("tagembed-widget").length;
            if (t && e && document.getElementsByClassName("tagembed-socialwall")) {
                const e = document.getElementsByClassName("tagembed-socialwall")[0];
                e && e.getAttribute("data-render-id") && e.getAttribute("data-is-load") && (t = 0)
            }
            for (var d = t && t > 0 ? document.getElementsByClassName("tagembed-socialwall") : document.getElementsByClassName("tagembed-widget"), n = 0; n < d.length; n++) if (null == d[n].getAttribute("data-is-load") || "0" == d[n].getAttribute("data-is-load") || null == d[n].getAttribute("data-is-load")) {
                const t = "https://widget.tagembed.com/embed.json", e = `root_${a(5)}`;
                d[n].setAttribute("data-render-id", e), d[n].setAttribute("data-is-load", 0), d[n].setAttribute("id", `co_${e}`), window.isTagEmbd = !0;
                fetch(t).then((t => t.json())).then((t => {
                    const {css: a, id: d, script: n} = t;
                    let l = document.createElement("div");
                    if (l.setAttribute("id", e), document.getElementById(`co_${e}`)) {
                        document.getElementById(`co_${e}`).appendChild(l);
                        let t = document.createElement("link");
                        t.setAttribute("type", "text/css"), t.setAttribute("rel", "stylesheet"), t.setAttribute("href", a), document.head.appendChild(t);
                        let d = document.createElement("script");
                        d.setAttribute("src", n), document.body.appendChild(d)
                    }
                }))
            }
        }
    }
}(window);
TagAppEmbed.init();