package unit

import (
	"fmt"
	"testing"
	"time"

	"github.com/B6406325/team03/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestMovie(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`Movie OK`, func(t *testing.T) {
		movie := entity.Movie{
			Title: "nung",
			Duration: 120,
			Description: "dee mak mak",
			ReleaseDate: time.Now(),
			Director: "fook",
			Cast: "fook",
			Image: "picture",
			Video: "https://www.youtube.com/watch?v=fhzKLBZJC3w",
		}

		ok, err := govalidator.ValidateStruct(movie)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run(`Title required`, func(t *testing.T) {
		movie := entity.Movie{
			Title: "",
			Duration: 120,
			Description: "dee mak mak",
			ReleaseDate: time.Now(),
			Director: "fook",
			Cast: "fook",
			Image: "picture",
			Video: "https://www.youtube.com/watch?v=fhzKLBZJC3w",
		}

		ok, err := govalidator.ValidateStruct(movie)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Title is required"))
	})

	t.Run(`Description more than 250`, func(t *testing.T) {
		movie := entity.Movie{
			Title: "nung",
			Duration: 120,
			Description: "dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak makdee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak dee mak mak",
			ReleaseDate: time.Now(),
			Director: "fook",
			Cast: "fook",
			Image: "picture",
			Video: "https://www.youtube.com/watch?v=fhzKLBZJC3w",
		}

		ok, err := govalidator.ValidateStruct(movie)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal(fmt.Sprintf("Description: %s does not validate as stringlength(1|250)", movie.Description)))
	})

	t.Run(`Video not url`, func(t *testing.T) {
		movie := entity.Movie{
			Title:       "nung",
			Duration:    120,
			Description: "hi",
			ReleaseDate: time.Now(),
			Director:    "fook",
			Cast:        "fook",
			Image:       "picture",
			Video:       "youtube",
		}
	
		ok, err := govalidator.ValidateStruct(movie)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Video is invalid"))
	})

}