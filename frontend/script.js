fetch("/posts")
    .then(response => response.json())
    .then(posts => {
        const container = document.getElementById("posts");
        posts.forEach(post => {
            const div = document.createElement("div");
            div.className = "post";
            div.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
            container.appendChild(div);
        });
    })
    .catch(error => console.error("Chyba při načítání:", error));
