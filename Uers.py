import numpy

class Users:

	def __init__(self):
		self.attributes = abs(numpy.random.randn(10))

	def distanceto(self, otherusers):
		for i in range(len(otherusers)):
			yield numpy.dot(self.attributes,otherusers[i].attributes)

	# def normalization(self):
	# some normalization for

us = []
for i in range(6):
	us.append(Users())

with open("dis.txt","w") as out:
	for i in range(len(us)):
		out.write("\n")
		for num in us[i].distanceto(us):
			out.write(str(num) + " ")