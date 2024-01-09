package unit

import (
	"testing"

	"github.com/B6406325/team03/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestUser(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`OK`, func(t *testing.T) {
		user := entity.User{
			Username: "1",
			Email: "1@gmail.com",
			Password: "1",
			Firstname: "1",
			Lastname: "1",
			Address: "1",
		}

		ok, err := govalidator.ValidateStruct(user)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
	})
}