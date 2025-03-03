// Načtení příspěvků z backendu
function loadPosts() {
    fetch("/posts")
        .then(response => response.json())
        .then(posts => {
            const container = document.getElementById("posts");
            container.innerHTML = "";
            posts.forEach(post => {
                const div = document.createElement("div");
                div.className = "post";
                div.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
                container.appendChild(div);
            });
        })
        .catch(error => console.error("Chyba při načítání:", error));
}

// Přidání příspěvku
function addPost() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    fetch("/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    }).then(() => {
        loadPosts();
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
    });
}

loadPosts();
