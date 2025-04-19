package utils

import (
	"testing"
)

func TestPowerOff(t *testing.T) {
	err := PowerOff(-1)
	if err != nil {
		t.Errorf("PowerOff failed: %v", err)
	}

}
