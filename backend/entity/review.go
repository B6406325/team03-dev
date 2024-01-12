package entity

import (
	"time"
	"gorm.io/gorm"
	"github.com/asaskevich/govalidator"

)

type Review struct {
	gorm.Model
	ReviewText string `valid:"maxstringlength(100)~พิมพ์ได้สูงสุด100ตัวอักษร"`
	DateTime   time.Time `valid:"CheckDateTime~วันที่ไม่ถูกต้อง"`

	UserID uint `valid:"-"`
	User   User `gorm:"references:id"`

	MovieID uint   `valid:"-"`
	Movie   Movie `gorm:"references:id"`

	RatingID uint	`valid:"required~Rating is required"`
	Rating   Rating `gorm:"references:id"`

	GenreID uint	`valid:"required~Genre is required"`
	Genre   Genre `gorm:"references:id"`

}

type Rating struct{
	gorm.Model
	RatingValue int `gorm:"uniqueIndex"`

	Review	[]Review	`gorm:"foreignkey:RatingID"`
}

type Genre struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`

	Review []Review `gorm:"foreignKey:GenreID"`
}


func init() {
	govalidator.CustomTypeTagMap.Set("CheckDateTime", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		if t.Before(time.Now().Add(-2*time.Minute)) || t.After(time.Now().Add(2*time.Minute)) {
			return false

		} else {
			return true
		}
	})
}
