 export class FetchApi {
     constructor(baseUrl) {
         this.baseUrl = baseUrl;
     }

     async getPosts() {

         const response = await fetch(this.baseUrl + '/posts', {
             method: 'GET',

             headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json',


             },

         });
         const postsJson = await response.json();
         return postsJson
     }

     async deletePostById(id) {
         const response = await fetch(this.baseUrl + '/posts/' + id, {
             method: "DELETE"
         })
         return response.text()
     }

     async editPost(id, title, text) {
         const urlencoded = new URLSearchParams();

         urlencoded.append("title", title)
         urlencoded.append('text', text)
         const response = await fetch(this.baseUrl + '/posts/' + id, {
             method: "PUT",
             headers: {
                 "Content-Type": "application/x-www-form-urlencoded",
             },
             body: urlencoded

         })

         return response.json()
     }
     async createNewPost(title, text) {
         const urlencoded = new URLSearchParams();
         urlencoded.append("title", title);

         urlencoded.append("description", text);
         const response = await fetch(this.baseUrl + '/posts', {
             method: "POST",
             headers: {
                 "Content-Type": "application/x-www-form-urlencoded",
             },
             body: urlencoded
         })
         return response.json()
     }

 }