from .models import Session

def computeSummary():
	edt = Session.objects.latest('endDate').endDate
	ts = int(round(edt.timestamp()))

	summary = {'lastWorked': ts}
	return summary
