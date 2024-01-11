import { ReviewInterface,RatingInterface,GenreInterface} from "../../interface/note";

const apiUrl = "http://localhost:8080";

async function ListReviews() {
    const requestOptions = {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    },

    };


    let res = await fetch(`${apiUrl}/reviews`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
    if (res.data) {
    return res.data;
    } else {
    return false;
    }

    });

    return res;
}

async function GetReviews(MovieID: Number | undefined) {
    const requestOptions = {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    },
    
    };
    
    
    let res = await fetch(`${apiUrl}/review/${MovieID}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
    if (res.data) {
    return res.data;
    } else {
    return false;
    }
    
    });
    
    return res;
}

async function GetReviewsByUserID(UserID: Number | undefined) {
    const requestOptions = {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    },
    
    };
    
    
    let res = await fetch(`${apiUrl}/getreview/${UserID}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
    if (res.data) {
    return res.data;
    } else {
    return false;
    }
    
    });
    
    return res;
}

async function CreateReview(data: ReviewInterface) {
    const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),

    };


    let res = await fetch(`${apiUrl}/review`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
    if (res.data) {
    return { status: true, message: res.data };
    } else {
    return { status: false, message: res.error };
    }

    });

    return res;
}

async function ListMovies() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/movies`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
}


async function GetMovieById(id: Number | undefined) {
    const requestOptions = {
      method: "GET"
    };
  
    let res = await fetch(`${apiUrl}/movie/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
}

async function ListRating() {
    const requestOptions = {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    },
    
    };
    
    
    let res = await fetch(`${apiUrl}/ratings`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
    if (res.data) {
    return res.data;
    } else {
    return false;
    }
    
    });
    
    return res;
}

async function ListGenre() {
    const requestOptions = {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    },
    
    };
    
    
    let res = await fetch(`${apiUrl}/genres`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
    if (res.data) {
    return res.data;
    } else {
    return false;
    }
    
    });
    
    return res;
}

async function DeleteReviewByUserID(id: Number | undefined) {
    const requestOptions = {
    method: "DELETE",
    headers: {
    "Content-Type": "application/json",
    },
    
    };
    
    
    let res = await fetch(`${apiUrl}/reviews/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
    if (res.data) {
    return res.data;
    } else {
    return false;
    }
    
    });
    
    return res;
}

async function UpdateReview(data: RatingInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/updatereview`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}



export {

    ListReviews,
    GetReviews,
    CreateReview,
    ListMovies,
    ListGenre,
    ListRating,
    DeleteReviewByUserID,
    UpdateReview,
    GetMovieById,
    GetReviewsByUserID,
    };


