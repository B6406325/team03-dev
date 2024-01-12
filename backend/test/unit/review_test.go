package unit

import (
	"testing"
	"time"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"

	"github.com/B6406325/team03/entity"
)

func TestGenreID(t *testing.T) {

	g := NewGomegaWithT(t)
	user := entity.User{
		Username:  "1",
		Email:     "1@gmail.com",
		Password:  "12345678",
		Firstname: "1",
		Lastname:  "1",
		Address:   "1",
		Dob: time.Now(),
	}

	movie := entity.Movie{
		Title:       "nung",
		Duration:    120,
		Description: "dee mak mak",
		ReleaseDate: time.Now(),
		Director:    "fook",
		Cast:        "fook",
		Image:       "picture",
		Video:       "https://www.youtube.com/watch?v=fhzKLBZJC3w",
	}

	// Pass Case: Genre founded
	t.Run(`genre founded`, func(t *testing.T) {
		review := entity.Review{
			ReviewText: " ",
			DateTime:   time.Now(),
			UserID:     1,
			User:       user,
			MovieID:    1,
			Movie:      movie,
			RatingID:   1,
			GenreID:    1, // Invalid Genre ID
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())

	})

		// Fail Case: Genre not found
		t.Run(`genre not founded`, func(t *testing.T) {
			review := entity.Review{
				ReviewText: " ",
				DateTime:   time.Now(),
				UserID:     1,
				User:       user,
				MovieID:    1,
				Movie:      movie,
				RatingID:   1,
				GenreID:    0, // Invalid Genre ID
			}
	
			ok, err := govalidator.ValidateStruct(review)
	
			g.Expect(ok).NotTo(BeTrue())
			g.Expect(err).NotTo(BeNil())
	
			g.Expect(err.Error()).To(Equal("Genre is required"))
		})

	
}

func TestRatingID(t *testing.T) {

	g := NewGomegaWithT(t)
	user := entity.User{
		Username:  "1",
		Email:     "1@gmail.com",
		Password:  "12345678",
		Firstname: "1",
		Lastname:  "1",
		Address:   "1",
		Dob: time.Now(),
	}

	movie := entity.Movie{
		Title:       "nung",
		Duration:    120,
		Description: "dee mak mak",
		ReleaseDate: time.Now(),
		Director:    "fook",
		Cast:        "fook",
		Image:       "picture",
		Video:       "https://www.youtube.com/watch?v=fhzKLBZJC3w",
	}

	// Pass Case: Genre founded
	t.Run(`rating founded`, func(t *testing.T) {
		review := entity.Review{
			ReviewText: " ",
			DateTime:   time.Now(),
			UserID:     1,
			User:       user,
			MovieID:    1,
			Movie:      movie,
			RatingID:   1,
			GenreID:    1, // Invalid Genre ID
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())

	})

		// Fail Case: Genre not found
		t.Run(`rating not founded`, func(t *testing.T) {
			review := entity.Review{
				ReviewText: " ",
				DateTime:   time.Now(),
				UserID:     1,
				User:       user,
				MovieID:    1,
				Movie:      movie,
				RatingID:   0,
				GenreID:    1, // Invalid Genre ID
			}
	
			ok, err := govalidator.ValidateStruct(review)
	
			g.Expect(ok).NotTo(BeTrue())
			g.Expect(err).NotTo(BeNil())
	
			g.Expect(err.Error()).To(Equal("Rating is required"))
		})

	
}

func TestReviewText(t *testing.T){
	
	g:= NewGomegaWithT(t)
	user := entity.User{
		Username:  "1",
		Email:     "1@gmail.com",
		Password:  "12345678",
		Firstname: "1",
		Lastname:  "1",
		Address:   "1",
		Dob: time.Now(),
	}

	movie := entity.Movie{
		Title:       "nung",
		Duration:    120,
		Description: "dee mak mak",
		ReleaseDate: time.Now(),
		Director:    "fook",
		Cast:        "fook",
		Image:       "picture",
		Video:       "https://www.youtube.com/watch?v=fhzKLBZJC3w",
	}

	t.Run(`ReviewText in range`, func(t *testing.T) {
		review := entity.Review{
			ReviewText: "this Case is Pass",
			DateTime:   time.Now(),
			UserID:     1,
			User:       user,
			MovieID:    1,
			Movie:      movie,
			RatingID:   1,
			GenreID:    1, // Invalid Genre ID
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())

	})

	
	t.Run(``, func(t *testing.T) {
		review := entity.Review{
			ReviewText: "The mesmerizing dance of sunlight on the rippling waves, casting a shimmering tapestry of reflections across the tranquil surface of the azure ocean, creates a captivating spectacle that transports you to a world where time seems to slow down, allowing you to savor each moment and appreciate the beauty that nature so generously bestows upon the vast expanse of the endless sea.",
			DateTime:   time.Now(),
			UserID:     1,
			User:       user,
			MovieID:    1,
			Movie:      movie,
			RatingID:   1,
			GenreID:    1, // Invalid Genre ID
		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("พิมพ์ได้สูงสุด100ตัวอักษร"))


	})
	



}
	

func TestDateTime(t *testing.T) {
	g := NewGomegaWithT(t)
	user := entity.User{
		Username:  "1",
		Email:     "1@gmail.com",
		Password:  "12345678",
		Firstname: "1",
		Lastname:  "1",
		Address:   "1",
		Dob: time.Now(),
	}

	movie := entity.Movie{
		Title:       "nung",
		Duration:    120,
		Description: "dee mak mak",
		ReleaseDate: time.Now(),
		Director:    "fook",
		Cast:        "fook",
		Image:       "picture",
		Video:       "https://www.youtube.com/watch?v=fhzKLBZJC3w",
	}


	//Fail Case,Date can't be past
	t.Run(`DateTime can't be past`,func(t *testing.T) {
		review:= entity.Review{
			ReviewText: " ",
			DateTime: time.Date(2023, 1, 1, 12, 00, 00, 00, time.UTC),
			UserID:     1,
			User:       user,
			MovieID:    1,
			Movie:      movie,
			RatingID: 1,
			GenreID: 1,

		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("วันที่ไม่ถูกต้อง")) 
	
	})

	//Pass Case
	t.Run(`DateTime Ok`,func(t *testing.T) {
		review:= entity.Review{
			ReviewText: " ",
			DateTime: time.Now(),
			UserID: 1,
			User: user,
			MovieID: 1,
			Movie: movie,
			RatingID: 1,
			GenreID: 1,

		}

		ok, err := govalidator.ValidateStruct(review)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())	
	})

}
